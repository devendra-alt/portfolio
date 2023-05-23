//project section
const projects_el = document.querySelector('#projects');

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

//project section
const createProject = (project) => {
  let project_el = document.createElement('article');
  project_el.id = project.id;
  project_el.className = 'project';
  let project_img = document.createElement('img');
  project_img.src = `assets/images/${project.featured_images[0]}.svg`;
  project_img.className = 'project-img';
  project_img.alt = 'project image';
  let project_overlay_el = document.createElement('div');
  project_overlay_el.classList.add('project-overlay', 'flex');
  let project_name_el = document.createElement('p');
  project_name_el.textContent = `${project.name}`;
  let ul_el = document.createElement('ul');
  ul_el.className = 'project-langs';
  for (let i = 0; i < project.technologies.length; i++) {
    const li_el = document.createElement('li');
    li_el.className = 'project-lang';
    li_el.textContent = `${project.technologies[i]}`;
    ul_el.appendChild(li_el);
  }
  project_overlay_el.appendChild(project_name_el);
  project_overlay_el.appendChild(ul_el);
  project_el.appendChild(project_img);
  project_el.appendChild(project_overlay_el);

  return project_el;
};

const loadProjects = () => {
  const projects_el = document.querySelector('#projects');
  fetch('projects.json')
    .then((response) => response.json())
    .then((data) => {
      const projectArray = data.projects;
      projectArray.forEach((project) => {
        projects_el.appendChild(createProject(project));
      });
    })
    .catch((error) => {
      console.error('Error:', error);
    });
};

loadProjects();
