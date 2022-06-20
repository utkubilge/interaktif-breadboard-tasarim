import Head from 'next/head'
import Board from "../comps/Board"

export default function Home() {
  return (
    <main>
      <Head>
        <title>İnteraktif Breadboard Simulasyonu</title>
        <meta name="description" content="İnteraktif Breadboard Sitesi" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Board />
      <div style={{backgroundColor: "#c6c6c8", height: "200px", width: "1500px", marginTop: "-25px", "borderRadius": "0 0 50px 0"}}>
      <div style={{"height": "30px"}}></div>
      <h1 style={{"marginLeft": "10px" }}>İnteraktif Breadboard Simulasyonu</h1>
      <h2 style={{"marginLeft": "10px" }}>Baha Utku BİLGE Tasarım Bitirme Projesi</h2>
      </div>



    </main>
  )
}
