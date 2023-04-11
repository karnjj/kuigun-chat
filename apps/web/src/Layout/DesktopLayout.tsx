import { Container } from '@mui/material'

const DesktopLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <Container
      maxWidth="md"
      sx={{
        display: 'flex',
        direction: 'column',
        height: '100vh',
        alignItems: 'center',
      }}
    >
      {children}
    </Container>
  )
}

export default DesktopLayout
