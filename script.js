const sortButton = document.getElementById('sortBtn');
const saveButton = document.getElementById('saveBtn');
const inputEl = document.getElementById('inputNums');
const resultBox = document.getElementById('resultBox');
const sortIdContainer = document.getElementById('sortingIdRes');
const getSortingBtn = document.getElementById('getSortingBtn');
const resetBtn = document.getElementById('resetBtn');

function bubbleSort() {
  if (inputEl.value.length > 0) {
    const array = inputEl.value.split(',').map((el) => Number(el));
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array.length - i - 1; j++) {
        if (array[j] > array[j + 1]) {
          let temp = array[j];
          array[j] = array[j + 1];
          array[j + 1] = temp;
        }
      }
    }
    resultBox.innerText = array;
  }
}

function generateSortingId() {
  return Math.floor(Math.random() * 1000);
}

function saveSortedArray() {
  if (resultBox.innerText) {
    const array = resultBox.innerText.split(',').map((el) => Number(el));
    const sortingId = generateSortingId();
    fetch('http://localhost:8080/api/elements', {
      method: 'POST',
      body: JSON.stringify({
        array: array,
        sorting_id: sortingId,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((res) => res.json())
      .then((json) => {
        sortIdContainer.innerText = `Идентификатор сортировки: ${json[0].sorting_id}`;
      });
  }
}

function getSortedElements() {
  if (inputEl.value.length) {
    const id = inputEl.value;
    fetch(`http://localhost:8080/api/elements/${id}`)
      .then((res) => res.json())
      .then((res) => {
        if (Array.isArray(res)) {
          const sortedArr = res.map((obj) => obj.val);
          resultBox.innerText = sortedArr;
        } else {
          resultBox.innerText = res;
        }
      });
  }
}

inputEl.addEventListener('input', () => {
  inputEl.value = inputEl.value.replace(/[^\d,]+/g, '');
});

sortButton.addEventListener('click', bubbleSort);
saveButton.addEventListener('click', saveSortedArray);
getSortingBtn.addEventListener('click', getSortedElements);
resetBtn.addEventListener('click', () => {
  inputEl.value = '';
  resultBox.innerText = '';
  sortIdContainer.innerText = '';
});
