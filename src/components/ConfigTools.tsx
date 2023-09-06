import {useState, Attributes} from 'react'
import {toast, ToastContainer} from 'react-toastify'
import {SketchPicker} from 'react-color'
import { MultiDirectedGraph } from 'graphology'
import {Button, Flex, Input, Select, Text, chakra} from '@chakra-ui/react'
import 'react-toastify/dist/ReactToastify.css'

interface ISettingContainer {
  handleAddNode: (nodeName: string, relatedNode: string, color: string) => void
  graph: MultiDirectedGraph<Attributes, Attributes, Attributes>
}

export default function ConfigTools({handleAddNode, graph}: ISettingContainer) {
  const [color, setColor] = useState<string>('')
  const [nodeName, setNodeName] = useState<string>('')
  const [relatedNode, setRelatedNode] = useState<string>('')
  const handleSubmit = () => {
    if (!nodeName || !relatedNode) {
      return toast('Please fill all input!')
    }
    handleAddNode(nodeName, relatedNode, color)
    setNodeName('')
  }
  return (
      <Flex direction='row' w='full' my='4' mx='2' justifyContent='space-between'>
        <chakra.div mb='8' gap='2'>
          <Text fontSize='sm' fontWeight='bold' color='gray.700' mb='2'>Name: </Text>
          <Input
            value={nodeName}
            onChange={(e) => setNodeName(e.target.value)}
            placeholder='please fill node name'
          />
        </chakra.div>
        <chakra.div mb='8' gap='2'>
          <Text fontSize='sm' fontWeight='bold' color='gray.700' mb='2'>Related : </Text>
          <Select onChange={(e) => setRelatedNode(e.target.value)} placeholder='Select relatedNode'>
            {graph.nodes()?.map((option: string, index: number) =>
              <option key={index} value={option}>{option}</option>
            )}
          </Select>
        </chakra.div>
        <chakra.div mb='8' gap='2'>
          <Text fontSize='sm' fontWeight='bold' color='gray.700' mb='2'>Color:</Text>
          <Flex justifyContent='center'>
            <SketchPicker onChange={({ hex }) => setColor(hex)} color={color} />
          </Flex>
        </chakra.div>
        <Button size='sm' colorScheme='blue' onClick={handleSubmit}>submit</Button>
        <ToastContainer theme='dark' />
      </Flex>
  )
}
