import React from 'react'
import {familyTree} from './App'


function treeTraverse(familyTree) {
    const members = familyTree.map(person => 
            <div className="person" key={person.id} 
            style={{backgroundColor: person.gender=='male' ? 'lightblue' : 'pink'}}>
                {person.name}
            </div>
        );
    return members
}

function isPartner(familyTree){

}

export default function FamilyTree() {
    const map1 = familyTree[0].children.sort();
    const map2 = familyTree[1].children.sort();
    console.log(map1.toString()===map2.toString());   
    console.log(familyTree[0].children[0]===familyTree[1].children[0])
    return (
        <>       
        {treeTraverse(familyTree)}
        </>
  )
}
