import './App.css';
import headline from './images/headline.png'
import paragraph from './images/paragraph.png'
import image from './images/image.png'
import { useState } from 'react';
import Slotitem from './components/slotitem';

function App() {



  const workspaceItems = [

    {
      id : 0,
      text : 'Headline',
      picture : headline
    },

    {
      id : 1,
      text : 'paragraph',
      picture : paragraph
    },

    {
      id : 2,
      text : 'button',
      picture : image
    },

    {
      id : 3,
      text : 'image',
      picture : image
    },

  ]

  const [newworkspaceItems, setnewworkspaceItems] = useState(workspaceItems)
  const [finalRender, setfinalRender] = useState([])



  function additem(text, pic) {

   const obj = {
      id : newworkspaceItems.length > 0 ? Math.max(...newworkspaceItems.map(e => e.id)) + 1 : 0,
      text : text,
      picture : pic
    }

    setnewworkspaceItems([...newworkspaceItems, obj])
    
  }


  function renderOnRight() {
    setfinalRender([...newworkspaceItems])
  }

  // console.log(finalRender)







  return (
    <div className="App">
       
       <div className='left-panel'>

        <div className='container-parrent'>

          <div onClick={() => additem('headline', headline)} className='containers'>
            <img className='container-photos' src={headline} alt="headline" />
            <p>Headline</p>
          </div>

          <div onClick={() => additem('paragraph', paragraph)} className='containers'>
            <img className='container-photos' src={paragraph} alt="headline" />
            <p>paragraph</p>
          </div>

          <div onClick={() => additem('button', image)} className='containers'>
            <img className='container-photos' src={image} alt="headline" />
            <p>button</p>
          </div>

          <div onClick={() => additem('image', image)} className='containers'>
            <img className='container-photos' src={image} alt="headline" />
            <p>image</p>
          </div>

        </div>

       </div>


       <div className='middle-section'>
           {
            newworkspaceItems.map((item, index) => {
              return (
              <div  key={index}>
                 <Slotitem item={item} props={{newworkspaceItems, setnewworkspaceItems}} />
              </div>
              )
            })
          }

         <button onClick={() => renderOnRight()}>render on right</button>

       </div>

       

       <div className='final-render'>
          {
            finalRender.map((item, index) => {
              return (
              <div  key={index}>
                <div className='workspace-par-render'>
                  <img src={item.picture} alt="slotpicture" />
                  <p>{item.text}</p>
                  <p>{item.id}</p>
                </div>
              </div>
              )
            })
          }
       </div>

    </div>
  );
}

export default App;
