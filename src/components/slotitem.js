
import up from '../images/up.png'
import down from '../images/down.png'
import copy from '../images/copy.png'
import erase from '../images/delete.png'
import { useEffect, useRef, useState } from 'react'


export default function Slotitem({props, item, renderOnRight, proprender}) {

    const [toggle, settoggle] = useState(false)
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

      useEffect(() => {
        textsetter(item.id)
      }, [value])


      useEffect(() => {
        renderOnRight()
      }, [newworkspaceItems, value])
      

      function toggleseter(e) {
        if(e.target === workspaceref.current) {
          settoggle(!toggle)
        }
      }
      



    return (
        <div   className='workspace-slot' >

            <div ref={workspaceref} onClick={(e) => toggleseter(e) } className={toggle ? 'workspace-par-active' : 'workspace-par'}>
              <img src={item.icon} alt="slotpicture" />
                <p>{item.type}</p>
                  
                  <div>
                    {
                      item.image === null && toggle ?
                      <div>
                <input className='input' type="text" name="text" value={value} onChange={(e) => setvalue(e.target.value)} />
                      </div>
                      : null
                    }
                  </div>

            </div>

                <div>
                    {
                        toggle?
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