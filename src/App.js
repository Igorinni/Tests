import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [voicesListDisplayed, setVoicesListDisplayed] = useState([])
  const [voicesListOrigin, setVoicesListOrigin] = useState()
  const { speechSynthesis, webkitSpeechRecognition } = window
  const [valueTextarea, setValueTextarea] = useState('')
  const [idSelectedVoice, setIdSelectedVoice] = useState(null)

  const getVoiceList = () => {
    const voices = speechSynthesis.getVoices()
    const voicesList = voices.map((voice) => ({
      name: voice.name,
      lang: voice.lang,
    }))
    console.log(voicesList)
    setVoicesListDisplayed(voicesList)
    setVoicesListOrigin(voices)
  }

  const speak = () => {
    if (speechSynthesis.speaking) {
      alert('Текст уже воспроизводится')
      console.log('Текст уже воспроизводится')
      return
    }
    if (!valueTextarea) return

    const newSpeakText = new SpeechSynthesisUtterance(valueTextarea)

    newSpeakText.voice = voicesListOrigin[idSelectedVoice]
    newSpeakText.pitch = 1
    newSpeakText.rate = 1

    speechSynthesis.speak(newSpeakText)
  }

  const stop = () => {
    speechSynthesis.cancel()
  }

  useEffect(() => {
    getVoiceList()
  }, [speechSynthesis])

  //  ---------------------------------------------------------------------

  const [resultTextTest2, setResultTextTest2] = useState('')
  const [resultTest2, setResultTest2] = useState('')
  const [resultAllAllTest2, setResultAllAllTest2] = useState('')
  const [resultErrorTest2, setResultErrorTest2] = useState('')

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition
  const SpeechGrammarList =
    window.SpeechGrammarList || window.webkitSpeechGrammarList
  const SpeechRecognitionEvent =
    window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent

  const recognition = new SpeechRecognition()
  const speechRecognitionList = new SpeechGrammarList()

  const grammar =
    '#JSGF V1.0; grammar colors; public <color> = aqua | azure | beige | bisque | black | blue | brown | chocolate | coral | crimson | cyan | fuchsia | ghostwhite | gold | goldenrod | gray | green | indigo | ivory | khaki | lavender | lime | linen | magenta | maroon | moccasin | navy | olive | orange | orchid | peru | pink | plum | purple | red | salmon | sienna | silver | snow | tan | teal | thistle | tomato | turquoise | violet | white | yellow ;'

  speechRecognitionList.addFromString(grammar, 1)

  recognition.grammars = speechRecognitionList
  recognition.continuous = false // непрерывные результаты else один результат при одном запуске
  recognition.lang = 'en-US'
  recognition.interimResults = false // промежуточный результат
  recognition.maxAlternatives = 1 // колличество потенциальных совпадений

  recognition.onresult = (event) => {
    const color = event.results[0][0].transcript
    setResultTextTest2(`Result received: ${color}.`)
    setResultTest2(color)
    console.log(`Confidence: ${event.results[0][0].confidence}`)
  }

  const speech222 = () => {
    recognition.start()
    console.log('Ready to receive a color command.')
  }

  recognition.onspeechend = () => {
    recognition.stop()
  }

  recognition.onnomatch = (event) => {
    setResultAllAllTest2("I didn't recognize that color.")
  }

  recognition.onerror = (event) => {
    setResultErrorTest2(`Error occurred in recognition: ${event.error}`)
  }

  //  ---------------------------------------------------------------------

  const recognizer = new webkitSpeechRecognition()
  recognizer.interimResults = true // промежуточный результат
  recognizer.lang = 'ru-Ru'

  recognizer.onresult = function (event) {
    const result = event.results[event.resultIndex]
    if (result.isFinal) {
      alert('Вы сказали: ' + result[0].transcript)
    } else {
      console.log('Промежуточный результат: ', result[0].transcript)
    }
  }

  const speech = () => {
    recognizer.start()
    console.log('Включили запись')
  }

  //  ---------------------------------------------------------------------

  return (
    <div className='App'>
      <div className='voice-container'>
        <div className='select-box'>
          <select onChange={(e) => setIdSelectedVoice(e.target.value)}>
            {voicesListDisplayed.map((voice, index) => (
              <option key={index} value={index}>
                {voice.name}({voice.lang})
              </option>
            ))}
          </select>
        </div>
        <div className='input-box'>
          <input />
        </div>
        <div className='text-box'>
          <textarea
            value={valueTextarea}
            onChange={(e) => setValueTextarea(e.target.value)}
          />
        </div>
      </div>
      <div className='buttons-container'>
        <button onClick={speak}>Прослушать</button>
        <button onClick={stop}>Остановить</button>
      </div>
      <div className='buttons-container'>
        <button onClick={speech}>Начать запись</button>
      </div>
      <div className='buttons-container'>
        <button onClick={speech222}>Начать запись222</button>
      </div>
    </div>
  )
}

export default App
