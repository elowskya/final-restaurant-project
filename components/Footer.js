import NextImage from './Image'

const Footer = () => {
  return (
    <div className="flex justify-between m-6">
      <p className="text-xs font-semibold text-gray-600"></p>
      <div className="flex gap-3 ml-4">
        <a href="https://github.com/elowskya" className="ml-3">
          <NextImage src="/github.svg" width={20} height={20} alt="GitHub" />
        </a>
      </div>
    </div>
  )
}

export default Footer
