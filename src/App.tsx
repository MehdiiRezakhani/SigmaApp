import { Flex } from '@chakra-ui/react'
import { MultiDirectedGraph } from 'graphology'
//components
import Main from './components/Main'
import ConfigTools from './components/ConfigTools'

export const App = () => {
  const graph = new MultiDirectedGraph()
  graph.addNode('1', {
    x: 0,
    y: 0,
    label: '1',
    size: 10,
    color: '#000',
  })
  graph.addNode('2', {
    x: 1,
    y: 1,
    label: '2',
    size: 10,
    color: '#ff0000',
  })
  graph.addEdgeWithKey('rel1','1', '2', { label: 'REL_1' })
  const handleAddNode = (label: string, relatedNode: string, color: string) => {
    const count = graph.nodes().length
    graph.addNode(label, {
      x: count*2,
      y: count + 1,
      label,
      size: 10,
      color,
    })
    graph.addEdgeWithKey(`rel${count}`, relatedNode, label, {
      label: `REL_${count}`,
    })
  }
  
  return (
    <Flex direction='column' w='full' h='container.xl' p='1'>
      <Main graphList={graph}/>
      <ConfigTools handleAddNode={handleAddNode} graph={graph}/>
    </Flex>
  )
}
