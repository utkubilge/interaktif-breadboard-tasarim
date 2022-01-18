import Head from 'next/head';
import Card from "./components/Card";
import Board from "./components/Board";

export default function Home() {
  const lines = 30;
  const powerlines = lines * 2 -4;
  const terminallines = lines * 5;

  return (
    <main>
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

        <div className='PowerTab'>
          <div className='PowerStrip'>
            <Board count={powerlines} />
          </div>
        </div>

        <div className='TerminalStrip'>
          <Board count={terminallines} />
        </div>
        <div className='Divit' />
        <div className='TerminalStrip'>
          <Board count={terminallines} />
        </div>
        <div className='PowerTab'>
          <div className='PowerStrip'>
            <Board count={powerlines} />
          </div>
        </div>

      </div>

      <div className="ToolBox"></div>




    </main>
  )
}
