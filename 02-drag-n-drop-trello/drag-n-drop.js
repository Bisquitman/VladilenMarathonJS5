class DragProto {

  addItemListeners(item) {
    item.addEventListener('dragstart', this.dragstart)
    item.addEventListener('dragenter', this.dragenter)
    item.addEventListener('dragover', this.dragover)
    item.addEventListener('dragleave', this.dragleave)
    item.addEventListener('dragend', this.dragend)
    item.addEventListener('drop', this.drop)
  }

  dragstart(event) {
    this.item = event.target
    event.target.classList.add('hold', 'dragitem')
    setTimeout(() => event.target.classList.add('hide'), 0)
  }

  dragend(event) {
    event.target.classList.remove('hold', 'hide', 'dragitem')
  }

  dragover(event) {
    event.preventDefault()
  }
  dragenter(event) {
    event.target.classList.add('hovered')
  }
  dragleave(event) {
    event.target.classList.remove('hovered')
  }

}

class DragItem extends DragProto {

  constructor() {
    super()
  }

  render() {
    const itm = document.createElement('textarea')
    itm.classList = 'item'
    itm.setAttribute('draggable', 'true')
    super.addItemListeners(itm)
    itm.addEventListener('dragstart', () => new Trasher().render())
    return itm
  }

  dragend(event) {
    event.target.classList.remove('hold', 'hide', 'dragitem')
    const trash = document.getElementById('trash')
    if (trash) {
      trash.remove()
    }
  }

  dragenter(event) {
    event.target.style.marginBottom = "50px"
  }
  dragleave(event) {
    event.target.style.marginBottom = "0px"
  }

  drop(event) {
    event.target.insertAdjacentElement('afterend', document.querySelector('.hold'))
    event.target.classList.remove('hovered')
    event.target.style.marginBottom = "0px"
    event.stopPropagation();
    const currentDrggableElement = document.getElementById('adder')
    if (currentDrggableElement.matches('.hold')) {
      event.target.insertAdjacentElement('afterend', new DragItem().render())
    }
  }
}


class DragPlaceholder extends DragProto {

  constructor() {
    super()

  }

  render() {
    const itm = document.createElement('div')
    itm.classList = 'placeholder'
    super.addItemListeners(itm)
    itm.removeEventListener('dragstart', this.dragstart)
    itm.removeEventListener('dragleave', this.dragend)
    return itm
  }

  drop(event) {
    event.target.appendChild(document.querySelector('.hold'))
    event.target.classList.remove('hovered')
    const currentDrggableElement = document.getElementById('adder')
    if (currentDrggableElement.matches('.hold')) {
      event.target.appendChild(new DragItem().render())
    }
  }


}


class Adder extends DragProto {
  constructor() {
    super()
  }

  render() {
    const itm = document.createElement('div')
    itm.setAttribute('id', 'adder')
    itm.setAttribute('draggable', 'true')
    itm.classList = 'item adder'
    itm.textContent = 'ADD'
    super.addItemListeners(itm)
    itm.removeEventListener('dragenter', this.dragenter)
    itm.removeEventListener('dragover', this.dragover)
    itm.removeEventListener('dragleave', this.dragleave)
    itm.removeEventListener('drop', this.drop)
    document.body.append(itm)
  }

  dragstart(event) {
    this.item = event.target
    event.target.classList.add('hold', 'dragitem')
  }

}


class Trasher extends DragProto {
  constructor() {
    super()
  }

  render() {
    const itm = document.createElement('div')
    itm.setAttribute('id', 'trash')
    itm.classList = 'placeholder'
    itm.textContent = 'Trash'
    super.addItemListeners(itm)
    document.body.append(itm)
  }

  dragenter() {}

  dragleave(event) {
    event.target.remove()
  }

  drop(event) {
    document.getElementsByClassName('item hold')[0].remove()
    event.target.remove()
  }
}


const ph1 = new DragPlaceholder().render()
const ph2 = new DragPlaceholder().render()
const ph3 = new DragPlaceholder().render()
document.querySelector('.holders').append(ph1, ph2, ph3)


const add = new Adder().render()
