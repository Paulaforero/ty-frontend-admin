import { styled, Button, CircularProgress } from '@mui/material'

export function TyButton(props) {
  const TyButton = styled(Button)({
    textTransform: 'none',
    fontWeight: 'bolder',
    fontSize: 14,
  })
  return (
    <TyButton
      variant="contained"
      size={props.size}
      type={props.type}
      color="primary"
      disabled={props.disabled}
      className={props.className}
      onClick={props.onClick}
    >
      {props.loading ? (
        <CircularProgress color="primary" size={24} />
      ) : (
        props.label
      )}
    </TyButton>
  )
}
