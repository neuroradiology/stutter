import Block from './block'

const whiteSpace = /[\n\r\s]/

export default class Stutter {
  constructor (options) {
    this.currentWord = null
    this.delay = 0
    this.timer = null
    this.isPlaying = false
    this.isEnded = false
    this.options = options
    this.setWPM(this.options.wpm)
  }

  setText (val) {
    if (val) {
      this.pause()
      this.restart()
      this.block = new Block(val)
      this.currentWord = this.block.word
    }
  }

  playPauseToggle () {
    if (this.isPlaying) {
      this.pause()
    } else {
      this.play()
    }
  }

  play () {
    if (this.block) {
      if (this.isEnded) {
        return
      }
      if (this.options.slowStartCount) {
        this.slowStartCount = this.options.slowStartCount
      }
      this.display()
      this.isPlaying = true
    }
  }

  pause () {
    clearTimeout(this.timer)
    this.isPlaying = false
  }

  restart () {
    if (this.block) {
      if (!this.isEnded) {
        this.pause()
      }
      if (this.options.slowStartCount) {
        this.slowStartCount = this.options.slowStartCount
      }
      this.block.restart()
      this.currentWord = this.block.word
      this.isEnded = false
      this.play()
    }
  }

  setWPM (val) {
    val = Number(val)
    val = Math.max(1, val)
    val = Math.min(1500, val)
    this.wpm = val
    this.delay = 1 / (val / 60) * 1000
  }

  setSentenceDelay (val) {
    val = Number(val)
    val = Math.max(1, val)
    val = Math.min(10, val)
    this.options.sentenceDelay = val
  }

  setOtherPuncDelay (val) {
    val = Number(val)
    val = Math.max(1, val)
    val = Math.min(10, val)
    this.options.otherPuncDelay = val
  }

  setShortWordDelay (val) {
    val = Number(val)
    val = Math.max(1, val)
    val = Math.min(10, val)
    this.options.shortWordDelay = val
  }

  setLongWordDelay (val) {
    val = Number(val)
    val = Math.max(1, val)
    val = Math.min(10, val)
    this.options.longWordDelay = val
  }

  setNumericDelay (val) {
    val = Number(val)
    val = Math.max(1, val)
    val = Math.min(10, val)
    this.options.numericDelay = val
  }

  setSlowStartCount (val) {
    val = Number(val)
    val = Math.max(0, val)
    val = Math.min(10, val)
    this.options.slowStartCount = val
  }

  updateWPMFromUI () {
    var newWPM = this.speedElement.val()
    newWPM = newWPM.match(/[\d]+/g)
    newWPM = parseInt(newWPM, 10)
    this.setWPM(newWPM)
  }

  display () {
    this.currentWord = this.block.word
    if (this.currentWord) {
      this.showWord()

      var time = this.delay

      if (this.currentWord.hasPeriod) time *= this.options.sentenceDelay
      if (this.currentWord.hasOtherPunc) time *= this.options.otherPuncDelay
      if (this.currentWord.isShort) time *= this.options.shortWordDelay
      if (this.currentWord.isLong) time *= this.options.longWordDelay
      if (this.currentWord.isNumeric) time *= this.options.numericDelay

      this.slowStartCount = (this.slowStartCount - 1) || 1
      time = time * this.slowStartCount

      this.timer = setTimeout(() => { this.next() }, time)
    } else {
      this.isPlaying = false
      this.isEnded = true
      // this.barElement.attr('data-progrecss', 100)
    }
  }

  showWord () {
    console.log(this.currentWord.val)
    if (this.displayElement) {
      var word = this.currentWord.val

      var before = word.substr(0, this.currentWord.index)
      var letter = word.substr(this.currentWord.index, 1)

      // fake elements
      var $before = this.options.element.find('._read_before').html(before).css('opacity', '0')
      var $letter = this.options.element.find('._read_letter').html(letter).css('opacity', '0')
      var calc = $before.textWidth() + Math.round($letter.textWidth() / 2)

      if (!this.currentWord.val.match(whiteSpace)) {
        this.displayElement.html(this.currentWord.val)
        this.displayElement.css('margin-left', -calc)
      }
    }

    if (this.options.element && this.block) {
      // this.barElement.attr('data-progrecss', parseInt(this.block.getProgress() * 100, 10))
    }
  }

  next () {
    this.block.next()
    this.display()
  }
}
