import React, { useEffect, useState, Attributes} from 'react'
import {Divider, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, useBoolean } from '@chakra-ui/react'
import { MultiDirectedGraph } from 'graphology'
import { SigmaContainer, useRegisterEvents } from '@react-sigma/core'
import '@react-sigma/core/lib/react-sigma.min.css'
import '@react-sigma/core/lib/react-sigma.min.css'

interface IMainContainer {
  graphList: MultiDirectedGraph<Attributes, Attributes, Attributes>
}

export default function Main({ graphList }: IMainContainer){
  const [visible, setVisible] = useBoolean()
  const [node, setNode] = useState<string>()
  const GraphEvents: React.FC = () => {
    const registerEvents = useRegisterEvents()
    useEffect(() => {
      registerEvents({
        clickNode: ({node}) => {
          setNode(node)
          setVisible.on()
        },
      })
    }, [registerEvents])
    return null
  }

  return (
    <Flex direction='column' w='full' m='1' h="container.lg">
      <SigmaContainer style={{ height: '100%', width: '100%' }} graph={graphList}>
        <GraphEvents />
      </SigmaContainer>
      <Modal isOpen={visible} onClose={setVisible.off}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader>Details</ModalHeader>
          <Divider />
          <ModalBody>
            <Flex p='4' alignItems='center' w='full'>
              Name: <Text fontWeight='bold' mx='2'>{node}</Text>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  )
}
