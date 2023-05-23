// project section

const projectsEl = document.querySelector('#projects');

// mobile menu

const mobileMenu = document.querySelector('.mobile-nav');
const menuItems = document.querySelectorAll('.mobile-nav ul li');
const menuBtn = document.getElementById('menu-i');
const closeBtn = document.getElementById('menu-i-close');

// mobile menu

menuItems.forEach((el) => {
  el.addEventListener('click', () => mobileMenu.classList.toggle('open-menu'));
});
menuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('open-menu');
});
closeBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('open-menu');
});

// project section

const createProjectBtn = () => {
  const projectBtnEl = document.createElement('button');
  const spanEl = document.createElement('span');
  const imgEl = document.createElement('img');

  projectBtnEl.classList.add('project-btn', 'flex');
  spanEl.textContent = 'See this project';

  imgEl.src = 'assets/images/right-arrow.svg';
  imgEl.height = 15;
  imgEl.width = 20;

  imgEl.alt = 'project btn img';

  projectBtnEl.appendChild(spanEl);
  projectBtnEl.appendChild(imgEl);

  return projectBtnEl;
};

const createProjectImage = (project) => {
  const projectImg = document.createElement('img');
  projectImg.src = `assets/images/${project.featured_images[0]}.svg`;
  projectImg.className = 'project-img';
  projectImg.alt = 'project image';
  return projectImg;
};

const createProjectTechStack = (project) => {
  const ulEl = document.createElement('ul');
  ulEl.className = 'project-langs';
  for (let i = 0; i < project.technologies.length; i += 1) {
    const liEl = document.createElement('li');
    liEl.className = 'project-lang';
    liEl.textContent = `${project.technologies[i]}`;
    ulEl.appendChild(liEl);
  }
  return ulEl;
};

const createProjectOverlay = (project) => {
  const projectOverlayEl = document.createElement('div');
  projectOverlayEl.classList.add('project-overlay', 'flex');
  const projectNameEl = document.createElement('p');
  projectNameEl.textContent = `${project.name}`;

  projectOverlayEl.appendChild(projectNameEl);
  projectOverlayEl.appendChild(createProjectTechStack(project));
  projectOverlayEl.appendChild(createProjectBtn());

  return projectOverlayEl;
};

const createProject = (project) => {
  const projectEl = document.createElement('article');
  projectEl.id = project.id;
  projectEl.className = 'project';

  projectEl.appendChild(createProjectImage(project));
  projectEl.appendChild(createProjectOverlay(project));
  return projectEl;
};

const loadProjects = () => {
  fetch('projects.json')
    .then((response) => response.json())
    .then((data) => {
      const projectArray = data.projects;
      projectArray.forEach((project) => {
        projectsEl.appendChild(createProject(project));
      });
    })
    .catch(() => {
      // console.error('Error:', error);
    });
};

loadProjects();
