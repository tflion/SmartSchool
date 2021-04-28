using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SmartSchool_WebAPI.Data;
using SmartSchool_WebAPI.Models;

namespace SmartSchool_WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
   
   public class ProfessorController : ControllerBase
    {
        private readonly IRepository _repo;

        public ProfessorController(IRepository repo){
            _repo = repo;
        }
        
        [HttpGet]
        public async Task<ActionResult> Get(){
            
            try
            {
                var result = await _repo.GetAllProfessoresAsync(true);
                return Ok(result);
                
            }
            catch (Exception ex)
            {
                return BadRequest($"Erro: {ex.Message}");
            }
        }

         [HttpGet("{ProfessorId}")]
        public async Task<ActionResult> GetByProfessorId(int professorId){
            
            try
            {
                var result = await _repo.GetProfessorAsyncById(professorId, true);
                return Ok(result);
                
            }
            catch (Exception ex)
            {
                return BadRequest($"Erro: {ex.Message}");
            }
        } 


       [HttpGet("ByAluno/{alunoId}")]
        public async Task<ActionResult> GetByAlunoId(int alunoId)
        {
            try
            {
                var result = await _repo.GetProfessoresAsyncByAlunoId(alunoId, true);
                return Ok(result);
            }
            catch (Exception ex)
            {
                 return BadRequest($"Erro: {ex.Message}");
            }
        }

        [HttpPost]
        public async Task<ActionResult> post(Professor model)
        {
            try
            {
                _repo.Add(model);

                if(await _repo.SaveChangesAsync()){
                    return Ok(model);
                }
              
            }
            catch (Exception ex)
            {
                 return BadRequest($"Erro: {ex.Message}");
            }

            return BadRequest();
        }

        [HttpPut("{ProfessorId}")]
        public async Task<ActionResult> put(int professorId, Professor model)
        {
            try
            {
                var professor = await _repo.GetProfessorAsyncById(professorId, false);
                if(professor == null) return NotFound("Professor não encontrado!");

                _repo.Update(model);

                if(await _repo.SaveChangesAsync()){
                    return Ok(model);
                }
              
            }
            catch (Exception ex)
            {
                 return BadRequest($"Erro: {ex.Message}");
            }

            return BadRequest();
        }

        [HttpDelete("{ProfessorId}")]
        public async Task<ActionResult> delete(int professorId)
        {
            try
            {
                var professor = await _repo.GetProfessorAsyncById(professorId, false);
                if(professor == null) return NotFound("Professor não encontrado!");

                _repo.Delete(professor);

                if(await _repo.SaveChangesAsync()){
                    return Ok("Professor deletado!");
                }
              
            }
            catch (Exception ex)
            {
                 return BadRequest($"Erro: {ex.Message}");
            }

            return BadRequest();
        }
    }
}