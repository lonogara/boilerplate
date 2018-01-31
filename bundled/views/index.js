import handles from './handles'
import exhibits from './exhibits'
import details from './details'

export default (isMobile) => {
  const commons = createCommons(isMobile)
  return handles.map((Handle, index) =>
    Handle({
      Exhibit: exhibits[index](isMobile, commons),
      Detail: details[index](isMobile, commons)
    })
  )
}

const createCommons = (isMobile) => ({})