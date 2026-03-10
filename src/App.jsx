import { useEffect, useState } from "react"
import { Button } from "./components/button"
import axios from "axios"
import { api } from "./services"
import { Card } from "./components/post-card/post-card"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { HomePage } from "./pages/home-page"
import { PostPage } from "./pages/post-page"

function App() {

  return (
    <BrowserRouter>
    {/* <div className="wrapper">
      {data.map(el => (
        <Card post={el}/>
      ))}
    </div> */}
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/post/:postId" element={<PostPage/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
