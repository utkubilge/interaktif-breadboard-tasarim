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
      <div style={{ backgroundColor: "#c6c6c8", height: "200px", width: "1500px", marginTop: "-25px", "borderRadius": "0 0 50px 0" , "boxShadow" : "rgba(0, 0, 0, 0.35) 0px 5px 15px"}}>
        <h1 style={{ "marginLeft": "30px",  "paddingTop": "50px"}}>İnteraktif Breadboard Simulasyonu</h1>
        <h2 style={{ "marginLeft": "30px"}}>Baha Utku BİLGE Tasarım Bitirme Projesi</h2>
        <a href="https://github.com/utkubilge/interaktif-breadboard-tasarim"><h2 style={{ "marginRight": "60px", "marginTop": "-110px", "textAlign": "right" }}>Github Kaynak Linki</h2></a>
        <a href="https://www.figma.com/file/R9TL2EsTNrKAqXrzkokgql/BreadboardDesign?node-id=0%3A1"><h2 style={{ "marginRight": "60px", "textAlign": "right" }}>Figma Tasarım Linki</h2></a>
      </div>

      <div style={{ "height": "620px", "width": "400px", "backgroundColor": "#c6c6c8", "marginTop": "-800px", "marginLeft": "1510px" , "boxShadow" : "rgba(0, 0, 0, 0.35) 0px 5px 15px", "borderRadius": "10px 10px 10px 10px"}}>
        <h1 style={{ "marginTop": "auto", "paddingTop": "10px", "marginLeft": "10px", "color": "maroon", "textDecoration" : "underline"}}>Kullanım Yardımı:</h1>
        <h2 style={{ "marginLeft": "10px" }}>- Kablo bağlamak için girişlere basılı tutup diğer girişe sürükleyin. Kabloyu kaldırmak için bağlantının üzerine tıklayın.</h2>
        <h2 style={{ "marginLeft": "10px" }}>- Entegre eklemek için sağdaki entegreleri sürükleyip devreye bırakın. Entegrenin bağlandığı girişler otomatik olarak gözükecektir.</h2>
        <h2 style={{ "marginLeft": "10px" }}>- Anahtarı açıp kapatmak için üzerine çift tıklayın.</h2>
        <h2 style={{ "marginLeft": "10px" }}>- Entegreyi kaldırmak için sağ tarafa sürükleyip bırakın.</h2>
      </div>



    </main>
  )
}
