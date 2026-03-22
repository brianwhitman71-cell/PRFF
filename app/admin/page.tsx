"use client";

const API_URL = "https://prff-scraper-production.up.railway.app";
const SECRET = "prff-refresh-2025";

// The bookmarklet code — runs in the user's browser on the CBS Sports standings page
const bookmarkletCode = `(function(){
  var url = window.location.href;
  if(!url.includes('cbssports.com')){alert('Run this on your CBS Sports standings page!');return;}

  // Detect year from URL or page
  var yearMatch = url.match(/season=(\d{4})/)||url.match(/\/(\d{4})\//);
  var year = yearMatch ? parseInt(yearMatch[1]) : new Date().getFullYear();

  // Try to read year from any visible year selector on page
  var selEl = document.querySelector('select[name*="season"], select[name*="year"], .season-nav select');
  if(selEl && selEl.value && /^\d{4}$/.test(selEl.value)) year = parseInt(selEl.value);

  // Find standings table
  var tables = document.querySelectorAll('table');
  var standingsTable = null;
  for(var i=0;i<tables.length;i++){
    var ths = tables[i].querySelectorAll('th');
    var headers = Array.from(ths).map(function(h){return h.innerText.trim().toUpperCase();});
    if(headers.some(function(h){return h==='W'||h==='WINS';})){standingsTable=tables[i];break;}
  }

  if(!standingsTable){
    // Try rows with win/loss patterns
    var allRows = document.querySelectorAll('tr');
    for(var j=0;j<allRows.length;j++){
      var cells = allRows[j].querySelectorAll('td');
      if(cells.length>=4){var txt=cells[2].innerText.trim();if(/^\d+$/.test(txt)){standingsTable=allRows[j].closest('table');break;}}
    }
  }

  if(!standingsTable){alert('Could not find standings table. Make sure you are on the Standings page.');return;}

  var headers=Array.from(standingsTable.querySelectorAll('th')).map(function(h){return h.innerText.trim().toUpperCase();});
  var wIdx=headers.findIndex(function(h){return h==='W'||h==='WINS';});
  var lIdx=headers.findIndex(function(h){return h==='L'||h==='LOSSES';});
  var pfIdx=headers.findIndex(function(h){return h.includes('PF')||h.includes('FOR');});
  var paIdx=headers.findIndex(function(h){return h.includes('PA')||h.includes('AGAINST');});

  var rows=standingsTable.querySelectorAll('tbody tr');
  var standings=[];
  rows.forEach(function(row,i){
    var cells=Array.from(row.querySelectorAll('td')).map(function(c){return c.innerText.replace(/\\n/g,' ').trim();});
    if(cells.length<3)return;
    var textCells=cells.filter(function(c){return c&&isNaN(Number(c));});
    standings.push({
      rank:i+1,
      team:textCells[0]||cells[0]||'—',
      owner:textCells[1]||'—',
      wins:wIdx>=0?cells[wIdx]:'—',
      losses:lIdx>=0?cells[lIdx]:'—',
      pointsFor:pfIdx>=0?cells[pfIdx]:'—',
      pointsAgainst:paIdx>=0?cells[paIdx]:'—'
    });
  });

  if(standings.length===0){alert('Found the table but could not read any rows.');return;}

  // Show confirmation overlay
  var overlay=document.createElement('div');
  overlay.style.cssText='position:fixed;top:20px;right:20px;background:#1a1a2e;color:#fff;border:2px solid #dc2626;border-radius:12px;padding:20px;z-index:999999;font-family:sans-serif;min-width:280px;box-shadow:0 10px 40px rgba(0,0,0,0.5)';
  overlay.innerHTML='<div style="font-weight:900;font-size:18px;margin-bottom:8px">🏈 PRFF Sync</div>'
    +'<div style="color:#9ca3af;margin-bottom:12px">Found <strong style="color:#f59e0b">'+standings.length+' teams</strong> for <strong style="color:#f59e0b">'+year+' season</strong></div>'
    +'<div style="display:flex;gap:8px">'
    +'<button id="prff-confirm" style="flex:1;background:#dc2626;color:#fff;border:none;padding:8px 16px;border-radius:8px;font-weight:700;cursor:pointer">Submit</button>'
    +'<button id="prff-cancel" style="flex:1;background:#374151;color:#fff;border:none;padding:8px 16px;border-radius:8px;cursor:pointer">Cancel</button>'
    +'</div>'
    +'<div id="prff-status" style="margin-top:10px;font-size:13px;color:#9ca3af"></div>';
  document.body.appendChild(overlay);

  document.getElementById('prff-cancel').onclick=function(){overlay.remove();};
  document.getElementById('prff-confirm').onclick=function(){
    var btn=document.getElementById('prff-confirm');
    var status=document.getElementById('prff-status');
    btn.disabled=true;btn.innerText='Sending...';
    fetch('${API_URL}/submit-standings',{
      method:'POST',
      headers:{'Content-Type':'application/json','x-refresh-secret':'${SECRET}'},
      body:JSON.stringify({year:year,standings:standings})
    }).then(function(r){return r.json();}).then(function(d){
      if(d.ok){status.innerHTML='<span style="color:#22c55e">✓ Saved '+d.count+' teams for '+d.year+'!</span>';}
      else{status.innerHTML='<span style="color:#ef4444">Error: '+d.error+'</span>';}
      setTimeout(function(){overlay.remove();},2000);
    }).catch(function(e){status.innerHTML='<span style="color:#ef4444">Network error</span>';});
  };
})();`;

const bookmarkletHref = `javascript:${encodeURIComponent(bookmarkletCode)}`;

export default function AdminPage() {
  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-red-500 mb-1">Admin</p>
        <h1 className="text-3xl font-black text-white uppercase">Sync Standings</h1>
        <p className="text-gray-500 mt-1 text-sm">
          Use the bookmarklet to push CBS Sports standings directly to the PRFF site.
        </p>
      </div>

      {/* Bookmarklet drag target */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
        <h2 className="font-black text-white uppercase tracking-wide">Step 1 — Add the Bookmarklet</h2>
        <p className="text-gray-400 text-sm">
          Drag the button below to your bookmarks bar. You only need to do this once.
        </p>
        <div className="flex items-center gap-4">
          {/* The draggable bookmarklet */}
          <a
            href={bookmarkletHref}
            onClick={(e) => { e.preventDefault(); alert("Drag this to your bookmarks bar, don't click it here."); }}
            className="inline-block bg-gradient-to-r from-red-600 to-amber-500 text-white font-black px-5 py-3 rounded-xl text-sm uppercase tracking-wide cursor-grab shadow-lg hover:opacity-90"
            draggable
          >
            🏈 Sync PRFF Standings
          </a>
          <span className="text-gray-600 text-sm">← drag this to your bookmarks bar</span>
        </div>
        <p className="text-xs text-gray-600">
          If your bookmarks bar is hidden in Safari: View → Show Favorites Bar
        </p>
      </div>

      {/* Instructions */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
        <h2 className="font-black text-white uppercase tracking-wide">Step 2 — Sync Standings</h2>
        <ol className="space-y-3">
          {[
            { n: "1", text: 'Go to your CBS Sports league standings page (log in if needed)', sub: "parsonsrun.football.cbssports.com/standings" },
            { n: "2", text: "Click the \"Sync PRFF Standings\" bookmark", sub: "A confirmation popup will appear showing the teams it found" },
            { n: "3", text: "Click Submit", sub: "Data saves instantly — standings appear on the PRFF site within seconds" },
          ].map((step) => (
            <li key={step.n} className="flex gap-4 items-start">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-red-600 to-amber-500 flex items-center justify-center text-white font-black text-sm flex-shrink-0 mt-0.5">
                {step.n}
              </div>
              <div>
                <div className="text-white font-semibold text-sm">{step.text}</div>
                <div className="text-gray-500 text-xs mt-0.5">{step.sub}</div>
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* Historical data */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-2">
        <h2 className="font-black text-white uppercase tracking-wide">Syncing Historical Years</h2>
        <p className="text-gray-400 text-sm">
          To load past seasons, add <code className="bg-white/10 px-1.5 py-0.5 rounded text-amber-400">?season=2023</code> to the standings URL and click the bookmarklet for each year.
        </p>
        <div className="flex flex-wrap gap-2 pt-1">
          {Array.from({ length: new Date().getFullYear() - 2012 + 1 }, (_, i) => 2012 + i).reverse().map((y) => (
            <a
              key={y}
              href={`https://parsonsrun.football.cbssports.com/standings?season=${y}`}
              target="_blank"
              rel="noreferrer"
              className="text-xs bg-white/5 border border-white/10 hover:border-amber-500/50 text-gray-400 hover:text-amber-400 px-3 py-1.5 rounded-lg transition-colors"
            >
              {y}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
