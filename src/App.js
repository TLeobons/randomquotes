import './App.css'
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {FacebookIcon, FacebookShareButton} from 'react-share'
import styled from 'styled-components'
import { createGlobalStyle } from 'styled-components'
import {FaQuoteLeft} from 'react-icons/fa'

const colors = ['#ff75a0', '#fce38a', '#eaffd0', '#95e1d3']

const picker = array => array[Math.floor(Math.random() * array.length)]

function App() {

  const [quotes, setQuotes] = useState([])
  const [pickedQuote, setPickedQuote] = useState({})
  const [pickedColor, setPickedColor] = useState('')
  
  useEffect(() => {
    async function fetchData() {
      const {data} = await axios.get('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json')
      setQuotes(data.quotes)
      setPickedColor(picker(colors))
    }
    fetchData()
  }, [])

  useEffect(() => {
    setPickedQuote(picker(quotes))
  }, [quotes])

  const mountNew = () => {
    setPickedQuote(picker(quotes))
    setPickedColor(picker(colors))
  }

  return (
    <Container background={pickedColor} className="App">
      <GlobalStyle/>
      <Quotes>
        <blockquote>
          <FaQuoteLeft/><span>{pickedQuote?.quote}</span>
        </blockquote>
        <figcaption> - {pickedQuote?.author}</figcaption>
        <Footer>

          <FacebookShareButton quote="https://www.google.com/">
            <FacebookIcon round />
          </FacebookShareButton>

          <Button onClick={mountNew} background={pickedColor}>
            New quote
          </Button>

        </Footer>
      </Quotes>
    </Container>
  )
}

export default App

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
`

const Container = styled.div`
  background-color: ${props => props.background};
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 2em;
  margin: 0;
  transition: 1s;
`

const Quotes = styled.div`
  background-color: white;
  padding: 30px;
`

const Footer = styled.div`
  display: flex;
  justify-content: space-around;
  `

const Button = styled.button`
 color: black;
 background-color: ${props => props.background};
 border: none;
 height: 2em;
 font-size: 0.5em;
 width: 120px;
 align-self: center;
 border-radius: 3px;
 cursor: pointer;
 transition: 1s;
 &:hover {
        opacity: 0.7;
      }
`