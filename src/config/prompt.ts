export const promptQuestions = [
  {
    type: 'input',
    name: 'id',
    message: 'Enter the ID of the doujin you want to download (https://hifumin.app)',
    validate: (answer: any) => {
      if (isNaN(answer)) {
        return 'please enter a number'
      } else if (answer.length !== 6) {
        return 'number must be 6 digits long'
      }
      return true
    },
  },
  {
    type: 'confirm',
    name: 'limit',
    message: 'Do you want to limit the number of downloaded pages?',
  },
  {
    type: 'input',
    name: 'limitPage',
    message: 'Please set the limit for downloaded pages',
    when: (answer: any) => answer.limit === true,
    validate: (answer: any) => {
      if (isNaN(answer)) {
        return 'please enter a number'
      }
      return true
    },
  },
]
