const canvas = document.querySelector('#canvas')
function clock() {
    const now = new Date()
    const ctx = canvas.getContext('2d')

    ctx.save()
    ctx.clearRect(0,0,700,700)
    ctx.translate(500, 200)
    ctx.rotate(-Math.PI / 2)

    ctx.fillStyle = '#f4f4f4'
    ctx.lineWidth = 5
    ctx.lineCap = 'round'
    ctx.strokeStyle = 'black'

// Clock Face
    ctx.save()
    ctx.beginPath()
    ctx.strokeStyle = border.value
    ctx.fillStyle = facee.value
    ctx.lineWidth = 14
    ctx.arc(0,0,142,0, Math.PI *2, true)
    ctx.stroke()
    ctx.fill()
    ctx.restore()
// Hour Number Lines
    ctx.save()
    ctx.strokeStyle = numberl.value
    for (let i = 0; i < 12; i++) {
        ctx.beginPath()
        ctx.rotate(Math.PI / 6 )
        ctx.moveTo(100,0)
        ctx.lineTo(120,0)
        ctx.stroke()
    }
    ctx.restore()
//Minutes Number Line
    ctx.save()
    ctx.strokeStyle = numberl.value
    for (let i = 0; i < 60; i++) {
        if (i % 5 !== 0) {
            ctx.beginPath()
            ctx.lineWidth = 4
            ctx.moveTo(117,0)
            ctx.lineTo(120,0)
            ctx.stroke()
        }
        ctx.rotate(Math.PI / 30 )
    }
    ctx.restore()
    const hr = now.getHours()
    const min = now.getMinutes()
    const secs = now.getSeconds()
    
// Hour Hand
    ctx.save()
    ctx.beginPath()
    ctx.rotate((Math.PI / 6) * hr + (Math.PI / 360)* min + (Math.PI / 21600) * secs)
    ctx.lineWidth = 14
    ctx.strokeStyle = large.value
    ctx.moveTo(-20, 0)
    ctx.lineTo(80, 0)
    ctx.stroke()
    ctx.restore()
// Minutes Hand
    ctx.save()
    ctx.beginPath()
    ctx.rotate((Math.PI / 30)* min + (Math.PI / 1800) * secs)
    ctx.lineWidth = 14
    ctx.strokeStyle = large.value
    ctx.moveTo(-20, 0)
    ctx.lineTo(114, 0)
    ctx.lineWidth = 8
    ctx.stroke()
    ctx.restore()
// Seconds Hand
    ctx.save()
    ctx.beginPath()
    ctx.rotate((Math.PI / 30) * secs)
    ctx.lineWidth = 14
    ctx.strokeStyle = small.value
    ctx.fillStyle = small.value
    ctx.moveTo(-20, 0)
    ctx.lineTo(114, 0)
    ctx.arc(0,0,8,0, Math.PI *2 , true)
    ctx.lineWidth = 8
    ctx.stroke()
    ctx.fill()
    ctx.restore()
    ctx.restore()
    requestAnimationFrame(clock)
}
requestAnimationFrame(clock)


const btn = document.querySelector('button')
const facee = document.querySelector('#face-color')
const border = document.querySelector('#border-color')
const numberl = document.querySelector('#number-color')
const large = document.querySelector('#large-color')
const small = document.querySelector('#small-color')

// Set Values
const savedcolors = JSON.parse(localStorage.getItem('colors'))
 if (savedcolors) {
    facee.value = savedcolors.facee
    border.value = savedcolors.border
    numberl.value = savedcolors.numberl
    large.value = savedcolors.large
    small.value = savedcolors.small
 }

// Save to LocalStorage
function savecolor(){
   const colors = {
    facee: facee.value,
    border : border.value,
    numberl : numberl.value,
    large : large.value,
    small : small.value
   }
    localStorage.setItem('colors', JSON.stringify(colors))
}
function changebtn(){
    const dataUrl = canvas.toDataURL('image/png')
    const link = document.createElement('a')
    link.download = 'clock.png'
    link.href = dataUrl
    link.click()
}
btn.addEventListener('click', changebtn)
btn.addEventListener('click', savecolor)