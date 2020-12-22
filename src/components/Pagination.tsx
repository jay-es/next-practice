import { Button, ButtonProps, Flex } from '@chakra-ui/react'

const createPageNums = (totalPages: number, currentPage: number) => {
  const NUM_PAGES = 5
  const nums = Array.from({ length: totalPages }, (_, i: number) => i)
  const start = currentPage - Math.floor(NUM_PAGES / 2)
  const end = currentPage + Math.ceil(NUM_PAGES / 2)

  if (start < 0) {
    return nums.slice(0, NUM_PAGES)
  }

  if (end > totalPages) {
    return nums.slice(-NUM_PAGES)
  }

  return nums.slice(start, end)
}

const MyButton = (props: ButtonProps) => (
  <Button fontSize="125%" fontWeight="thin" mx="px" width="12" {...props} />
)

type Props = {
  currentPage: number
  totalCount: number
  perPage: number
  setPage: (newVal: number) => void
}
export const Pagination = ({
  currentPage,
  totalCount,
  perPage,
  setPage,
}: Props) => {
  const totalPages = Math.ceil(totalCount / perPage)
  const pageNums = createPageNums(totalPages, currentPage)
  const isFirst = currentPage <= 0
  const isLast = currentPage >= totalPages - 1

  return (
    <Flex my={4} justifyContent="center">
      <MyButton disabled={isFirst} onClick={() => setPage(0)}>
        ⇤
      </MyButton>
      <MyButton disabled={isFirst} onClick={() => setPage(currentPage - 1)}>
        ←
      </MyButton>
      {pageNums.map((num, i) => (
        <Button
          key={i}
          onClick={() => setPage(num)}
          fontWeight={num === currentPage ? 'bold' : 'thin'}
          mx="px"
          width="10"
        >
          {num + 1}
        </Button>
      ))}
      <MyButton disabled={isLast} onClick={() => setPage(currentPage + 1)}>
        →
      </MyButton>
      <MyButton disabled={isLast} onClick={() => setPage(totalPages - 1)}>
        ⇥
      </MyButton>
    </Flex>
  )
}
