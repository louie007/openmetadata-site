const testimonialContainer = document.querySelector('#testimonialContainer');
const MAX_TESTIMONIAL_WORDS = 60;

const readMoreDescription = (btn) =>{
  let testimonial = btn.parentElement;
  testimonial.querySelector(".dots").classList.toggle("hide");
  testimonial.querySelector(".more").classList.toggle("hide");
  btn.textContent === "Read more" ? btn.textContent = "Read less" : btn.textContent = "Read more";
}

const getDescription = (text) => {
  const textArr = text.split(' ');
  const showDots = textArr.length > MAX_TESTIMONIAL_WORDS
  return `<div>
    <span class="mb-0 card-description main">${textArr.slice(0,MAX_TESTIMONIAL_WORDS).join(' ')}</span>
    ${showDots ? `<span class="dots">...</span>` : ''}
    <span class="mb-0 card-description hide more">${textArr.slice(MAX_TESTIMONIAL_WORDS).join(' ')}</span>
  ${showDots ? `<span class="read-more-button" onclick="readMoreDescription(this)">Read more</span>` : ''}  
  </div>`
}


const fetchTestimonials = async () => {
  const res = await fetch('./js/testimonials.json');
  const data = await res.json();

  testimonialContainer.innerHTML = data
    .map(({ name, image, description, company, url, title }, index) => {
      return `<div class="swiper-slide" key=${index} >
                  <div class="testimonial-card card card-team">
                    <div class="card-body">
                        <img class="card-team-img mb-3"
                        src=${image}
                        alt=${company}/>
                      <div class="card-team-name mb-3"><strong><a href=${url} target="_blank">${company}</a></strong></div>
                      ${getDescription(description)}           
                      <p class="card-footer-custom font-500"><strong>- ${name}</strong></p>
                      <p class="card-footer-custom opacity-6 text-italic">${title}</p>
                    </div>  
                 </div>
              </div>`;
    })
    .join('');
};

fetchTestimonials();

var swiper = new Swiper('.mySwiper', {
  grabCursor: true,
  spaceBetween: 10,
  autoplay: {
    delay: 5000,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    640: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 1,
      spaceBetween: 40,
    },
    1024: {
      slidesPerView: 2,
      spaceBetween: 50,
    },
  },
});
