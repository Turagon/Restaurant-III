const body = document.querySelector('body')
const container = document.querySelector('.container')

container.addEventListener('click', event => {
  const target = event.target
  if (target.classList.contains('card-shop-delete')) {
    const data = target.dataset.id
    renderModal(data)
    setTimeout(removeModal(), 500)
  } 
})


// 顯示Modal
function renderModal(data) {
  const modal = document.createElement("div")
  modal.classList = 'modalContainer'
  modal.innerHTML = `
    <div class="modalBox">
      <h4 class="modal-head">親 善意提醒你</h4>
      <h5 class="modal-warning">這個操作會導致資料被刪除 你要繼續嗎?</h5>
      <div class="modal-btn-box">
        <form action="/restaurant/${data}?_method=DELETE" method="POST">
          <button type="button" class="btn btn-secondary close-modal" data-bs-dismiss="modal"><i class="fas fa-undo"></i>返回</button>
          <button type="submit" class="btn btn-danger"><i class="fas fa-trash-alt"></i>確認刪除</button>
        </form>
      </div>
    </div>
    `
  body.insertBefore(modal, container)
}

function removeModal () {
  const modal = document.querySelector('.modalContainer')
  modal.addEventListener('click', event => {
    const target = event.target
    if (target.classList.contains('close-modal')) {
      modal.remove()
    }
  })
}