import { Box } from '@chakra-ui/react'
import { DragEventHandler, useRef, useState } from 'react'

const DragItem = ({
  name,
  index,
  onDragStart,
  onMove,
}: {
  name: string
  index: number
  onDragStart: (dragIndex: number) => void
  onMove: (dropIndex: number) => void
}) => {
  const [isDragging, setIsDragging] = useState(false)

  // add to props of DragItem component

  // add this to DragItem component and
  const _onDragEnter: DragEventHandler<HTMLElement> = () => {
    onMove(index)
  }

  // and defined onDragEnter for the <Box> in DragItem
  return (
    <Box
      draggable
      onDrag={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
      onDragOver={(evt) => evt.preventDefault()}
      onDragStart={() => onDragStart(index)}
      onDragEnter={_onDragEnter}
      sx={{
        padding: 2,
        borderRadius: 2,
        mb: 2,
        border: '1px solid rgba(0,0,0,0.1)',
        opacity: isDragging ? 0 : 1,
        _hover: {
          cursor: 'pointer',
        },
      }}
    >
      {name}
    </Box>
  )
}

export default function Home() {
  const [data, setData] = useState([
    'Alice',
    'Bob',
    'Charlie',
    'Diana',
    'Ethan',
    'Fiona',
    'George',
    'Hannah',
    'Isaac',
    'Julia',
  ])

  const refDragIndex = useRef<number>()

  const onMove = (dropIndex: number) => {
    const dragIndex = refDragIndex.current

    setData((prevList) => {
      if (dragIndex !== undefined) {
        // move dragging item to new position
        const dragItem = prevList.splice(dragIndex, 1)
        prevList.splice(dropIndex, 0, ...dragItem)
      }
      return [...prevList]
    })

    // reset drag item position to new index
    refDragIndex.current = dropIndex
  }

  const onDragStart = (dragIndex: number) => {
    refDragIndex.current = dragIndex
  }

  return (
    <Box
      sx={{
        border: '1px solid rgba(0,0,0,0.3)',
        borderRadius: 4,
        width: 300,
        margin: 'auto',
        padding: 4,
      }}
    >
      {data.map((item, i) => (
        <DragItem
          onMove={onMove}
          onDragStart={onDragStart}
          index={i}
          key={item}
          name={item}
        />
      ))}
    </Box>
  )
}
