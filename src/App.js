import './App.css';
import headline from './images/headline.png'
import paragraph from './images/paragraph.png'
import image from './images/image.png'
import testimage from './images/testimage.png'
import { useState } from 'react';
import Slotitem from './components/slotitem';

function App() {



  const workspaceItems = [

    {
      id : 0,
      type : 'Headline',
      icon : headline,
      image : null,
      text : 'type text'
    },

    {
      id : 1,
      type : 'paragraph',
      icon : paragraph,
      image : null,
      text : 'type text'
    },

    {
      id : 2,
      type : 'button',
      icon : image,
      image : null,
      text : 'type text'
    },

    {
      id : 3,
      type : 'image',
      icon : image,
      image : testimage,
      text : 'type text here'
    },

  ]

  const [newworkspaceItems, setnewworkspaceItems] = useState(workspaceItems)
  const [rerender, setrerender] = useState(true)
  const [update, setupdate] = useState(false)



  function additem(type, icon, image) {

   const obj = {
      id : newworkspaceItems.length > 0 ? Math.max(...newworkspaceItems.map(e => e.id)) + 1 : 0,
      type : type,
      icon : icon,
      image : image ? image : null,
      text : 'type text'
    }

    setnewworkspaceItems([...newworkspaceItems, obj])
    
  }


  function renderOnRight() {
    setupdate(!update)
  }




  return (
    <div className="App">
       
       <div className='left-panel'>

        <div className='container-parrent'>

          <div onClick={() => additem('Headline', headline)} className='containers'>
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

          <div onClick={() => additem('image', image, testimage)} className='containers'>
            <img className='container-photos' src={image} alt="headline" />
            <p>image</p>
          </div>

        </div>

       </div>

       <div>

        {
          rerender ?

       <div className='middle-section'>
           {
            newworkspaceItems.map((item, index) => {
              return (
              <div  key={index}>
                 <Slotitem proprender={{setrerender}} renderOnRight={renderOnRight} item={item} props={{newworkspaceItems, setnewworkspaceItems}} />
              </div>
              )
            })
          }

       </div>

       : 

       <div className='middle-section' ></div>

        }

       </div>

       

       <div className='final-render'>
          {
            newworkspaceItems.map((item, index) => {
              return (
              <div  key={index}>
                  {
                    (item.type === 'Headline') ? 
                    (<h1 className='headline'>{item.text}</h1>) : ((item.type === 'paragraph') ? 
                    (<p className='paragraph' >{item.text}</p>) : ((item.type === 'button') ?
                    (<button className='button'>{item.text}</button>) : ((item.type === 'image') ? 
                    (<img className='image' src={item.image} alt="img" />) : null)))
                  }
              </div>
              )
            })
          }
       </div>

    </div>
  );
}

export default App;
