const router = require('express').Router();
const dbPromise = require('../config/dbconfig');
let pool;

// Initialize the database connection when the module loads
(async () => {
  try {
    pool = await dbPromise;
    console.log('Database pool ready in routes');
  } catch (err) {
    console.error('Failed to initialize database pool in routes:', err);
  }
})();
// Helper function for query execution
async function executeQuery(query, params = []) {
  if (!pool) {
    throw new Error('Database connection not established');
  }
  const [results] = await pool.execute(query, params);
  return results;
}

router.get("/get-portfolio-data", async (req, res) => {
  try {
    if (!pool) {
      throw new Error('Database connection not ready');
    }
    
    // Fetch all data in parallel
    const [intros, abouts, projects, contacts, experiences, courses] = await Promise.all([
      executeQuery('SELECT * FROM intros LIMIT 1'),
      executeQuery('SELECT * FROM abouts LIMIT 1'),
      executeQuery('SELECT * FROM projects'),
      executeQuery('SELECT id, name, gender, email, mobile, age, address FROM contacts LIMIT 1'),
      executeQuery('SELECT * FROM experiences'),
      executeQuery('SELECT * FROM courses')
    ]);

    res.status(200).send({
      intro: intros[0] || null,
      about: abouts[0] || null,
      projects: projects,
      contact: contacts[0] || null,
      experience: experiences,
      courses: courses,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ 
      error: error.message,
      message: "Database operation failed"
    });
  }
});

// Update intro
router.post("/update-intro", async (req, res) => {
  try {
    const { id, welcome_text, first_name, last_name, caption, description } = req.body;
    
    const query = `
      UPDATE intros 
      SET welcome_text = ?, first_name = ?, last_name = ?, caption = ?, description = ?
      WHERE id = ?
    `;
    await executeQuery(query, [welcome_text, first_name, last_name, caption, description, id]);
    
    const updatedIntro = await executeQuery('SELECT * FROM intros WHERE id = ?', [id]);
    
    res.status(200).send({
      data: updatedIntro[0],
      success: true,
      message: "Intro updated successfully"
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
});

// Update about
router.post("/update-about", async (req, res) => {
  try {
    const { id, lottie_url, description, skills } = req.body;
    
    const query = `
      UPDATE abouts 
      SET lottie_url = ?, description = ?, skills = ?
      WHERE id = ?
    `;
    await executeQuery(query, [lottie_url, description, JSON.stringify(skills), id]);
    
    const updatedAbout = await executeQuery('SELECT * FROM abouts WHERE id = ?', [id]);
    
    res.status(200).send({
      data: updatedAbout[0],
      success: true,
      message: "About updated successfully"
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
});

// Add experience
router.post("/add-experience", async (req, res) => {
  try {
    const { title, period, company, description } = req.body;
    
    const query = `
      INSERT INTO experiences (title, period, company, description)
      VALUES (?, ?, ?, ?)
    `;
    const result = await executeQuery(query, [title, period, company, description]);
    
    const newExperience = await executeQuery('SELECT * FROM experiences WHERE id = ?', [result.insertId]);
    
    res.status(200).send({
      data: newExperience[0],
      success: true,
      message: "Experience added successfully"
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
});

// Update experience
router.post("/update-experience", async (req, res) => {
  try {
    const { id, title, period, company, description } = req.body;
    
    const query = `
      UPDATE experiences 
      SET title = ?, period = ?, company = ?, description = ?
      WHERE id = ?
    `;
    await executeQuery(query, [title, period, company, description, id]);
    
    const updatedExperience = await executeQuery('SELECT * FROM experiences WHERE id = ?', [id]);
    
    res.status(200).send({
      data: updatedExperience[0],
      success: true,
      message: "Experience updated successfully"
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
});

// Delete experience
router.post("/delete-experience", async (req, res) => {
  try {
    const { id } = req.body;
    
    const deletedExperience = await executeQuery('SELECT * FROM experiences WHERE id = ?', [id]);
    await executeQuery('DELETE FROM experiences WHERE id = ?', [id]);
    
    res.status(200).send({
      data: deletedExperience[0],
      success: true,
      message: "Experience deleted successfully"
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
});

// Add project
router.post("/add-project", async (req, res) => {
  try {
    const { title, description, image, links, technologies } = req.body;
    console.log(req.body)
    const query = `
      INSERT INTO projects (title, description, image, links, technologies)
      VALUES (?, ?, ?, ?, ?)
    `;
    const result = await executeQuery(query, [
      title, 
      description, 
      image, 
      JSON.stringify(image), 
      JSON.stringify(technologies)
    ]);
    //   console.log(result)
    
    const newProject = await executeQuery('SELECT * FROM projects WHERE id = ?', [result.insertId]);
    
    res.status(200).send({
      data: newProject[0],
      success: true,
      message: "Project added successfully"
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
});

// Update project
router.post("/update-project", async (req, res) => {
  try {
    const { id, title, description, image, links, technologies } = req.body;
    
    const query = `
      UPDATE projects 
      SET title = ?, description = ?, image = ?, links = ?, technologies = ?
      WHERE id = ?
    `;
    await executeQuery(query, [
      title, 
      description, 
      image, 
      JSON.stringify(image), 
      JSON.stringify(technologies), 
      id
    ]);
    
    const updatedProject = await executeQuery('SELECT * FROM projects WHERE id = ?', [id]);
    
    res.status(200).send({
      data: updatedProject[0],
      success: true,
      message: "Project updated successfully"
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
});

// Delete project
router.post("/delete-project", async (req, res) => {
  try {
    const { id } = req.body;
    
    const deletedProject = await executeQuery('SELECT * FROM projects WHERE id = ?', [id]);
    await executeQuery('DELETE FROM projects WHERE id = ?', [id]);
    
    res.status(200).send({
      data: deletedProject[0],
      success: true,
      message: "Project deleted successfully"
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
});

// Add course
router.post("/add-Courses", async (req, res) => {
  try {
    const { title, description, image } = req.body;
    console.log(req.body)
    const query = `
      INSERT INTO courses (title, description, image)
      VALUES (?, ?, ?)
    `;
    const result = await executeQuery(query, [title, description, image]);
    
    const newCourse = await executeQuery('SELECT * FROM courses WHERE id = ?', [result.insertId]);
    
    res.status(200).send({
      data: newCourse[0],
      success: true,
      message: "Course added successfully"
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
});

// Update course
router.post("/update-Courses", async (req, res) => {
  try {
    const { id, title, description, image } = req.body;
    
    const query = `
      UPDATE courses 
      SET title = ?, description = ?, image = ?
      WHERE id = ?
    `;
    await executeQuery(query, [title, description, image, id]);
    
    const updatedCourse = await executeQuery('SELECT * FROM courses WHERE id = ?', [id]);
    
    res.status(200).send({
      data: updatedCourse[0],
      success: true,
      message: "Course updated successfully"
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
});

// Delete course
router.post("/delete-Courses", async (req, res) => {
  try {
    const { id } = req.body;
    
    const deletedCourse = await executeQuery('SELECT * FROM courses WHERE id = ?', [id]);
    await executeQuery('DELETE FROM courses WHERE id = ?', [id]);
    
    res.status(200).send({
      data: deletedCourse[0],
      success: true,
      message: "Course deleted successfully"
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
});

// Update contact
// Update contact
router.post("/update-contact", async (req, res) => {
  try {
    const { id, name, gender, email, mobile, age, address } = req.body;
    console.log("Updating contact with data:", req.body);

    const query = `
      UPDATE contacts 
      SET name = ?, gender = ?, email = ?, mobile = ?, age = ?, address = ?
      WHERE id = ?
    `;

    await executeQuery(query, [name, gender, email, mobile, age, address, id]);

    const updatedContact = await executeQuery('SELECT * FROM contacts WHERE id = ?', [id]);

    res.status(200).send({
      data: updatedContact[0],
      success: true,
      message: "Contact updated successfully"
    });
  } catch (error) {
    console.error("Update contact error:", error);
    res.status(500).send({ error: error.message });
  }
});


module.exports = router;