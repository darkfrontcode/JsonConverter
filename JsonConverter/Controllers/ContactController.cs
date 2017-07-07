using JsonConverter.Helpers;
using JsonConverter.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Cors;

namespace JsonConverter.Controllers
{
    public class ContactController : ApiController
    {
		#region Constructor

		private Monkey _monkey;

		public ContactController()
		{
			_monkey = new Monkey();
		}

		#endregion

		#region Get
		public IHttpActionResult Get()
		{
			try
			{ 
				IList<Contact> contacts = _monkey.Read();
				return Ok(contacts);
			}
			catch(Exception ex)
			{ 
				return BadRequest(ex.Message);
			}
		}
		#endregion

		#region Delete
		[Route("api/contact/{name}")]
		public IHttpActionResult Delete(string name)
		{
			try
			{ 
				List<Contact> contacts = _monkey.Read();

				var firstMatch = contacts.First(item => item.Name == name);
				contacts.Remove(firstMatch);

				_monkey.WriteAll(contacts);

				return Ok();
			}
			catch(Exception ex)
			{ 
				return BadRequest(ex.Message);
			}

		}
		#endregion

		#region Post
		public IHttpActionResult Post([FromBody] Contact contact)
		{
			try
			{ 
				_monkey.Write(contact);
				return Ok();
			}
			catch(Exception ex)
			{ 
				return BadRequest(ex.Message);
			}
		}
		#endregion
    }
}
