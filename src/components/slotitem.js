
import up from '../images/up.png'
import down from '../images/down.png'
import copy from '../images/copy.png'
import erase from '../images/delete.png'
import { useEffect, useRef, useState } from 'react'


export default function Slotitem({props, item, renderOnRight, proprender}) {

    const [url, seturl] = useState(item.image)
    const [value, setvalue] = useState(item.text)
    
    const newworkspaceItems = props.newworkspaceItems
    const setnewworkspaceItems = props.setnewworkspaceItems

    const setrerender = proprender.setrerender

    const workspaceref = useRef()

    function remove(id) {
        const filterout = newworkspaceItems.filter(item => item.id !== id)
        setnewworkspaceItems(filterout)
        renderOnRight()
      }
    
      function copyitem(id) {
        const finditem = newworkspaceItems.find(item => item.id === id)
        setrerender(false)
        setTimeout(() => {
         setrerender(true)
        }, 50)
        const newitem = structuredClone(finditem)
        const highestid = Math.max(...newworkspaceItems.map(e => e.id))
        newitem.id = highestid + 1
        newitem.istoggled = false
        const items = [...newworkspaceItems]
        items.splice(newworkspaceItems.indexOf(finditem) + 1, 0, newitem)
        setnewworkspaceItems(items)
      }
    
      function moveup(id) {
        const finditem = newworkspaceItems.find(item => item.id === id)
        setrerender(false)
       setTimeout(() => {
        setrerender(true)
       }, 50)
        if(newworkspaceItems.indexOf(finditem) !== 0) {
        const items = [...newworkspaceItems]
         items.splice(newworkspaceItems.indexOf(finditem) - 1, 1, newworkspaceItems[newworkspaceItems.indexOf(finditem)])
         items.splice(newworkspaceItems.indexOf(finditem), 1, newworkspaceItems[newworkspaceItems.indexOf(finditem) - 1])
        setnewworkspaceItems(items)
        }
        
      }
    
      function movedown(id) {
        const finditem = newworkspaceItems.find(item => item.id === id)
        setrerender(false)
        setTimeout(() => {
         setrerender(true)
        }, 50)
        if(newworkspaceItems.indexOf(finditem) < newworkspaceItems.length - 1) {
        const items = [...newworkspaceItems]
         items.splice(newworkspaceItems.indexOf(finditem) + 1, 1, newworkspaceItems[newworkspaceItems.indexOf(finditem)])
         items.splice(newworkspaceItems.indexOf(finditem), 1, newworkspaceItems[newworkspaceItems.indexOf(finditem) + 1])
        setnewworkspaceItems(items)
        }
        
      }

      
      function textsetter(id) {
        const finditem = newworkspaceItems.find(item => item.id === id)
        if(finditem) {
          finditem.text = value
        }
      }

      function imagesetter(id) {
        const finditem = newworkspaceItems.find(item => item.id === id)
        if(finditem) {
          finditem.image = url
        }
      }

      function toggleseter(e, id) {
        if(e.target === workspaceref.current) {
        const finditem = newworkspaceItems.find(item => item.id === id)
        finditem.rownumber =  Math.max(...newworkspaceItems.map(e => e.rownumber)) + 1
        finditem.istoggled = !finditem.istoggled
        const findtoggled = newworkspaceItems.filter(item => item.istoggled === true)
        console.log(findtoggled.sort((a, b) => a.rownumber - b.rownumber))
        console.log(newworkspaceItems)
        if(findtoggled.length > 1) {
          findtoggled.sort((a, b) => a.rownumber - b.rownumber)[0].istoggled = false
          findtoggled.sort((a, b) => a.rownumber - b.rownumber)[0].rownumber = 0
          findtoggled.sort((a, b) => a.rownumber - b.rownumber)[1].rownumber = 1
        }
          setrerender(false)
          setTimeout(() => {
          setrerender(true)
          }, 50)
        }
      }


      useEffect(() => {
        textsetter(item.id)
      }, [value])

      useEffect(() => {
        imagesetter(item.id)
      }, [url])


      useEffect(() => {
        renderOnRight()
      }, [newworkspaceItems, value, url])
      
      




    return (
        <div   className='workspace-slot' >

            <div ref={workspaceref} onClick={(e) => toggleseter(e , item.id) } className={item.istoggled ? 'workspace-par-active' : 'workspace-par'}>
              <img src={item.icon} alt="slotpicture" />
                <p>{item.type}</p>
                  
                  <div>
                    {
                       item.type !== 'image' && item.istoggled ? 
                       <div>
                <input className='input' type="text" name="text" value={value} onChange={(e) => setvalue(e.target.value)} />
                       </div>
                       : null
                    } 
                  </div>

                  <div>
                    {
                       item.type === 'image' && item.istoggled ? 
                       <div>
                        <p className='image-warning'>please enter valid url of image down below</p>
                <input className='input' type="text" name="text" value={url}  onChange={(e) => seturl(e.target.value)} />
                       </div>
                       : null
                    } 
                  </div>

            </div>

                <div>
                    {
                        item.istoggled?
                    <div>

                        <div className='movment'>
                        <img onClick={() => moveup(item.id)} className='arrows' src={up} alt="up" />
                        <img onClick={() => movedown(item.id)} className='arrows' src={down} alt="down" />
                      </div>
                      <div className='creation'>
                        <img onClick={() => copyitem(item.id)} className='arrows' src={copy} alt="up" />
                        <img onClick={() => remove(item.id)} className='arrows' src={erase} alt="down" />
                      </div>

                     </div>
                        : null
                    }
                </div>

        </div>
    )
}