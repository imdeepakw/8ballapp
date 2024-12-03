document.querySelector('#clickMe').addEventListener('click', makeReq)

async function makeReq(){
  const res = await fetch(`/api`)
  const data = await res.json()
  console.log(data);

  let questionAsked = document.querySelector('input').value;
  document.querySelector("#answer").textContent = data.answer;
  document.querySelector('.question').textContent = questionAsked;

};