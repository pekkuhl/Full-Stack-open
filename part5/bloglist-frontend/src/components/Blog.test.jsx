import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders title', () => {
  const blog = {
    author: 'Kirsi Huttunen',
    id: '69946f4d396b5c1e04518ecb',
    likes: 2342358,
    title: 'Kirsin lauantai',
    url: 'http://kirsinblog.com/kirsinlauantai',
    user: {
      id: '69944ec2b5b384e20e09b466',
      name: 'Kirsi Huttunen',
      username: 'kirsi88'
    }
  }

  render(<Blog blog={blog} user={{ username: 'testi' }}></Blog>)

  const title = screen.getAllByText('Kirsin lauantai', { exact: false })
  console.log(title)
})