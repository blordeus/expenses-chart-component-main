const chartEl = document.querySelector('#chart');

const formatMoneyToDollars = (amt) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "USD"}).format(amt);

const isCurrentDay = (dayName = 'Friday') => {
    const today = new Date().getDay();
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return daysOfWeek[today] === dayName;
}


function generateChartItem(item){
  const data = {
    dayName: item.day,
    dayAbbr: item.day.substring(0,3).toLowerCase(),
    dayAmt: item.amount,
    currentDay: isCurrentDay(item.day),
  };
  return `
  <div class="relative flex-1 grid">
   <button aria-label="${data.dayName}'s spending was ${formatMoneyToDollars(data.dayAmt)}" class="peer grid gap-3">
          <div class="${data.currentDay === true ? "bg-accent2" : "bg-accent1"} rounded-sm h-0" style="height: ${data.dayAmt * 1.5}px;"></div>
          <p class="text-xs text-neutral2">${data.dayAbbr}</p>
      </button>
      <p class="text-xs p-1 text-neutral4 bg-neutral1 p-1 rounded-sm absolute -top-8 left-1/2 -translate-x-1/2 transition-opacity duration-300 opacity-0 peer-focus:opacity-100 peer-hover:opacity-100" aria-hidden="true">${formatMoneyToDollars(data.dayAmt)}</p>
  </div>
  `;
}

 async function fetchChartData(){
    const chartFetch = await fetch('data.json');
    const chartData = await chartFetch.json();
    const array = chartData.map((i) => parseInt(i.amount));
    const chartHeight = Math.max(...array) + Math.max(...array);
    chartEl.innerHTML = chartData.map(i => generateChartItem(i)).join('');
}

fetchChartData()
