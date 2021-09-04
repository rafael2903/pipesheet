import SelectSearch from 'react-select-search/dist/cjs/SelectSearch'
import Fuse from 'fuse.js'
import styles from './styles.module.css'
import Image from 'next/image'

export default function Select({ ...rest }) {
  function fuzzySearch(options) {
    const fuse = new Fuse(options, {
      keys: ['name', 'groupName', 'items.name'],
      threshold: 0.3,
    })

    return (value) => {
      if (!value.length) {
        return options
      }

      return fuse.search(value)
    }
  }

  return (
    <div className='w-full relative'>
      <div className='absolute right-4 z-50 transform -translate-y-2/4  top-1/2 h-5'>
        <Image 
          src='/expand.svg'
          alt='expandir lista'
          width={20}
          height={20}
        />
      </div>
      <SelectSearch
        search
        options={[
          { value: 'hamburger', name: 'Hamburger' },
          { value: 'fries', name: 'Fries' },
          { value: 'milkshake', name: 'Milkshake' },
        ]}
        filterOptions={fuzzySearch}
        emptyMessage='Não encontrado'
        className={(key) => styles[key]}
        {...rest}
      />
    </div>
  )
}
