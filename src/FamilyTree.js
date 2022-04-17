import React from 'react'
import {familyTree} from './App'


function treeTraverse(root,familyTree,couples) { 
    let atRoot = true;
    let endOfTree = false;
    const treeMap = []
    const historicLeaf = []
    if(atRoot){
            root.forEach(person => {
            treeMap.push(renderLeaf(person));
            historicLeaf.push(person)
        })
        atRoot = false
    } 
    
    // while(!endOfTree) {
    //     let prevGen = []
    //     if(atRoot){
    //         root.forEach(person => {
    //             treeMap.push(renderLeaf(person));
    //             historicLeaf.push(person)     
    //             prevGen.push(person)
    //         })
    //         atRoot = false;
    //     }
    //     if(!endOfTree){
    //         let nextGen = findNextGen(prevGen,familyTree,couples)
    //         prevGen = nextGen.map(child => child)
    //         nextGen.forEach(person=>{
    //             treeMap.push(renderLeaf(person));
    //             historicLeaf.push(person)
    //         })
    //     }
    // }
    return treeMap;
}

function findNextGen(prevGen,familyTree,couples){
    const nextGenID = []
    prevGen.forEach(person=>{
        person.children.forEach(child=>{
            if(!nextGenID.includes(child)) {return nextGenID.push(child)} return nextGenID;
        })     
    })
    const nextGen = []
    familyTree.filter(person=>{
        if(nextGenID.includes(person.id)) {return nextGen.push(person)} return nextGen;
    })
    nextGen.forEach(person => {
        if(person.children.toString()!==""){
            couples.forEach(couple=>{
                if(couple.includes(person)){
                    couple.forEach(a=>{if(a.id!==person.id)
                        {nextGen.push(a)}
                    })
                }
            })
        }
    })
    return nextGen;
}

function groupByGen(familyTree){
    
}

function renderLeaf(person,hasParent,hasPartner,style) {
    return  <div className="person" key={person.id} 
            style={{backgroundColor: person.gender==='male' ? 'lightblue' : 'pink',
                    padding: '10px',
                    margin: '5px 10px',
                    width: '150px',
                    height: '50px',
                    textAlign: 'center',
                    display: 'inline-block',
                    horizontalAlign: 'center',
            }}>
                {person.name}
            </div>
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
        couple.push(parentsArray.filter(
            parents => parents.children.sort().toString() === person.children.sort().toString()))          
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
    return root.flat();
}

export default function FamilyTree() {
    const root = isRoot(isPartner(hasChild(familyTree)))
    const couples = isPartner(hasChild(familyTree))
    console.log(couples)

    console.log(findNextGen([familyTree[5],familyTree[10]],familyTree,couples))

    console.log(familyTree[0].children[2]===familyTree[2].id) //Test ID searching

    return (
        <>       
        {treeTraverse(root,familyTree,couples)}
        </>
  )
}
