import React from 'react'
import {familyTree} from './App'


function treeTraverse(familyTree) {
    
    const root = isRoot(isPartner(hasChild(familyTree)))
    
    const members = root.map(person => 
            <div className="person" key={person.id} 
            style={{backgroundColor: person.gender==='male' ? 'lightblue' : 'pink'}}>
                {person.name}
            </div>
        );
    return members
}

function hasChild(familyTree){
    const parents = [];
    familyTree.forEach(person => {
        if(person.children.toString()!==""){
            parents.push(person);
        }
    })
    return parents;
} 

function isPartner(parentsArray){
    const prevChildSet = [];
    const couple = [];
    parentsArray.forEach(person => {
        if(prevChildSet.includes(person.children.sort().toString())){
            return prevChildSet;
        }   
        prevChildSet.push(person.children.sort().toString());
        couple.push(parentsArray.filter(parents => parents.children.sort().toString() === person.children.sort().toString()))          
    })
    return couple;
}

function isRoot(coupleArray){
    const root = [];
    coupleArray.forEach(couple =>{
        if(couple[0].parents.toString()=="" && couple[1].parents.toString()==""){
            root.push(couple);
            
        }       
    })
    return root.flat();;
}

export default function FamilyTree() {

    

    console.log(isPartner(hasChild(familyTree)))

    console.log(familyTree)

    return (
        <>       
        {treeTraverse(familyTree)}
        </>
  )
}
