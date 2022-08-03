
import up from '../images/up.png'
import down from '../images/down.png'
import copy from '../images/copy.png'
import erase from '../images/delete.png'
import { useState } from 'react'


export default function Slotitem({props, item,}) {

    const [toggle, settoggle] = useState(false)
    
    const newworkspaceItems = props.newworkspaceItems
    const setnewworkspaceItems = props.setnewworkspaceItems

    function remove(id) {
        const filterout = newworkspaceItems.filter(item => item.id !== id)
        setnewworkspaceItems(filterout)
      }
    
      function copyitem(id) {
        const finditem = newworkspaceItems.find(item => item.id === id)
        const newitem = structuredClone(finditem)
        const highestid = Math.max(...newworkspaceItems.map(e => e.id))
        newitem.id = highestid + 1
        const items = [...newworkspaceItems]
        items.splice(newworkspaceItems.indexOf(finditem) + 1, 0, newitem)
        setnewworkspaceItems(items)
      }
    
      function moveup(id) {
        const finditem = newworkspaceItems.find(item => item.id === id)
        if(newworkspaceItems.indexOf(finditem) !== 0) {
        const items = [...newworkspaceItems]
         items.splice(newworkspaceItems.indexOf(finditem) - 1, 1, newworkspaceItems[newworkspaceItems.indexOf(finditem)])
         items.splice(newworkspaceItems.indexOf(finditem), 1, newworkspaceItems[newworkspaceItems.indexOf(finditem) - 1])
        setnewworkspaceItems(items)
        }
        
      }
    
      function movedown(id) {
        const finditem = newworkspaceItems.find(item => item.id === id)
        if(newworkspaceItems.indexOf(finditem) < newworkspaceItems.length - 1) {
        const items = [...newworkspaceItems]
         items.splice(newworkspaceItems.indexOf(finditem) + 1, 1, newworkspaceItems[newworkspaceItems.indexOf(finditem)])
         items.splice(newworkspaceItems.indexOf(finditem), 1, newworkspaceItems[newworkspaceItems.indexOf(finditem) + 1])
        setnewworkspaceItems(items)
        }
        
      }


    return (
        <div onClick={() => settoggle(!toggle)}  className='workspace-slot' >

            <div className='workspace-par'>
              <img src={item.picture} alt="slotpicture" />
                <p>{item.text}</p>
                {/* <p>{item.id}</p> */}
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