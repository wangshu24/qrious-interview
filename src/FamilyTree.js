import React from 'react'
import {familyTree} from './App'


function treeTraverse(root,familyTree,couples) { 
    let atRoot = true;
    let endOfTree = false;
    const treeMap = []
    const historicLeaf = []
    let prevGen = []
    
    while(historicLeaf.length != familyTree.length){
        if(atRoot){
            root.forEach(person => {
                treeMap.push(renderLeaf(person,false,true));
                historicLeaf.push(person)     
                prevGen.push(person)
            })
            atRoot = false;
        }
        if(historicLeaf.length != familyTree.length){
            let nextGen = findNextGen(prevGen,familyTree,couples)
            prevGen = []
            prevGen = nextGen.map(child => {return child})
            nextGen.forEach(person=>{
                treeMap.push(renderLeaf(person));
                historicLeaf.push(person)
            })
        } else {
            endOfTree = true;
        }
    } 
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
    let atRoot = true
    let endOfTree = false;
    const root = isRoot(isPartner(hasChild(familyTree)))
    const couples = isPartner(hasChild(familyTree))
    const treeMap = []
    const historicLeaf = []
    let prevGen = []
    
    while(historicLeaf.length != familyTree.length){
        if(atRoot){
            root.forEach(person => {
                treeMap.push(renderLeaf(person));
                historicLeaf.push(person)     
                prevGen.push(person)
            })
            atRoot = false;
        }
        if(historicLeaf.length != familyTree.length){
            let nextGen = findNextGen(prevGen,familyTree,couples)
            prevGen = []
            prevGen = nextGen.map(child => {return child})
            nextGen.forEach(person=>{
                treeMap.push(renderLeaf(person));
                historicLeaf.push(person)
            })
        } else {
            endOfTree = true;
        }
    }
    return treeMap;
}

function renderLeaf(person,hasParent,hasPartner) {
    return  <div className="person" key={person.id} 
            style={{backgroundColor: person.gender==='male' ? 'lightblue' : 'pink',
                    position: hasParent === true? 'absolute' : 'relative',
                    display: hasPartner===true? 'block' : 'inline-block',
                    padding: '10px',
                    margin: '5px auto',
                    width: '150px',
                    height: '50px',
                    textAlign: 'center',
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

    console.log(groupByGen(familyTree))
    
    return (
        <>       
        {treeTraverse(root,familyTree,couples)}
        </>
  )
}
