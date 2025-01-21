export const generateRandomString = (length) => {
  return Math.random().toString(36).substring(2, length + 2)
}

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('id-ID')
}

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR'
  }).format(amount)
} 