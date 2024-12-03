document.querySelector('#clickMe').addEventListener('click', makeReq)

async function makeReq(){
    const environment = document.querySelector('#env').value
    // console.log(environment)
    const res = await fetch(`/api?env=${environment}`)
    const data = await res.json()
    console.log(data);
    document.querySelector('p').textContent = data.answer
};