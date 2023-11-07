//libraries like jquery etc
//main.js

//resp-menu
window.addEventListener('load', () => {
  const hamburgerBtn = document.getElementById('menu-btn')
  const nav = document.getElementById('menu')

  hamburgerBtn.addEventListener('click', () => {
    console.log(hamburgerBtn)
    nav.classList.toggle('flex')
    nav.classList.toggle('hidden')
  })

  const navFields = document.querySelectorAll('.nav-field')
  const homeLink = document.querySelector('a[href="#home"]')
  const otherLinksNav = document.querySelectorAll('.nav-field:not([href="#home"])')

  if (!navFields) return false

  function addActiveClassToHome() {
    homeLink.classList.add('active-nav')
    otherLinksNav.forEach((link) => link.classList.remove('active-nav'))
  }

  // arrow function
  // const addActiveClassToHome = () => {
  //   homeLink.classList.add("active-nav")
  //   otherLinksNav.forEach(link => link.classList.remove('active-nav'))
  //   }

  function setActiveNavField() {
    const currentPosition = window.scrollY

    navFields.forEach(function (navField) {
      const target = document.querySelector(navField.getAttribute('href'))
      const targetPosition = target.offsetTop // Returns the distance from the outer boundary of the current element relative to the inner top edge of its parent
      const targetHeight = target.offsetHeight // Returns the height of the element

      if (currentPosition >= targetPosition && currentPosition < targetPosition + targetHeight) {
        navField.classList.add('active-nav')
      } else {
        navField.classList.remove('active-nav')
      }
    })
  }

  // scroll preko arrow functions
  // const setActiveNavField = () => {
  //   const currentPosition = window.scrollY

  //   navFields.forEach((navField) => {
  //     const target = document.querySelector(navField.getAttribute('href'))
  //     const targetPosition = target.offsetTop
  //     const targetHeight = target.offsetHeight

  //     if (currentPosition >= targetPosition && currentPosition < targetHeight + currentPosition) {
  //       navField.classList.add('active')
  //     } else {
  //       navField.classList.remove('active')
  //     }
  //   })
  // }
  // window.addEventListener('scroll', () => {
  //   setActiveNavField()
  // })

  window.addEventListener('scroll', function () {
    setActiveNavField()
  })
  navFields.forEach(function (navField) {
    navField.addEventListener('click', function () {
      addActiveClassToHome()
    })
  })
  addActiveClassToHome()


  // year in footer
  const year = document.querySelector('.footer-date')
  let currentYear = new Date().getFullYear()
  year.innerHTML = currentYear

  //fetch and filtering
  const projectsContainer = document.querySelector('.projects-container')
  const filterBtns = document.querySelectorAll('.filter-buttons button')
  let newsItems = []
  let fetchedData = []

  async function fetchNewsItems() {
    try {
      const response = await fetch('https://637c98d916c1b892ebb8d75a.mockapi.io/cards')
      fetchedData = await response.json()

      newsItems = fetchedData.slice(0, 11).map((item) => ({
        image: item.image,
        category: item.category,
        headline: item.headline
      }))

      displayNewsItems(newsItems)
    } catch (error) {
      console.log('Error fetching news items:', error)
    }
  }


  function displayNewsItems(items) {
    console.log('newsItems', items)
    let displayNews = items.map(function (item) {
      return `
        <div class='card items-center max-h-full flex flex-col rounded-md cursor-pointer duration-500 hover:scale-105'>
          <div class="h-80 w-full">
            <img class='rounded-md h-full w-full object-cover' src='${item.image}' alt='${item.headline}' /> </div>
            <div
              class='flex flex-col justify-between items-center h-3/6 gap-2 py-5 px-2.5 w-9/12 md:w-11/12 lg:w-10/12 mt-[-18%] md:mt-[-25%] bg-textWhite drop-shadow-md rounded-md md:px-2 lg:py-9 lg:px-10'
            >
              <p class='text-textBlue font-semibold text-sm'>${item.category}</p>
              <p class='text-darkerGrey font-bold text-xl text-center mb-3'>${item.headline}</p>
              <button
                class='text-textLightGrey font-medium text-sm py-3 px-7 rounded-md border text-center border-border hover:text-textWhite hover:bg-textBlue hover:border-textBlue'
                href='#'
                alt='View Details'
              >View Details</button>
            </div>
          </div>
        `
    })
    console.log('displayNews', displayNews)

    projectsContainer.innerHTML = displayNews.join('')
  }



  














  function handleFilterButtonClick(filterId) {
    projectsContainer.classList.add('animate-cards')

    setTimeout(() => {
      projectsContainer.classList.remove('animate-cards')
    }, 200)

    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        const category = e.currentTarget.getAttribute('data-id')
        console.log(category)
        console.log(fetchedData)
        let projectCategory = fetchedData.filter((project) => project.category.toLowerCase() == category.toLowerCase())
        console.log(projectCategory)

        if (category === 'all') {
          displayNewsItems(newsItems)
          console.log('newsItems', newsItems)
        } else {
          displayNewsItems(projectCategory)
          console.log('projectCategory', projectCategory)
        }
        updateActiveFilter(btn)
      })
    })

    const updateActiveFilter = (clickedBtn) => {
      filterBtns.forEach((btn) => {
        if (btn === clickedBtn) {
          btn.classList.add('active-filters')
        } else {
          btn.classList.remove('active-filters')
        }
      })
    }
    updateActiveFilter(filterId)
  }




  const allProjectsFilter = document.querySelector('button#all-projects')
  console.log(allProjectsFilter)
  const otherFilters = document.querySelectorAll('.filters')
  console.log(otherFilters)

  function addActiveClassToFilter() {
    allProjectsFilter.classList.add('active-filters')
    otherFilters.forEach((button) => button.classList.remove('active-filters'))
  }

  addActiveClassToFilter()
  // navFields.forEach(function (navField) {
  //   navField.addEventListener('click', function () {
  //     addActiveClassToHome()
  //   })
  // })
  // addActiveClassToHome()

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => handleFilterButtonClick(btn.getAttribute('data-id')))
  })
  fetchNewsItems()
})
