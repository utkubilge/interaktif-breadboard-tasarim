import Head from 'next/head';
import Card from "./components/Card";

export default function Home() {
  return (
    <div>
      <Head>
        <title>İnteraktif Breadboard</title>
        <meta name="description" content="Baha Utku Bilge Bitirme Projesi" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <p className='app-title'>İnteraktif Breadboard</p>
        <p>Baha Utku Bilge Tasarım Bitirme Projesi</p>
      </header>
      
      <div className='Board'>
        <div className='Divit'/>
        <div className='Line'style={{top:"3%"}}/>
        <div className='Line' style={{top:"85%"}}/>

        <div></div>
        
      </div>




    </div>
  )
}
