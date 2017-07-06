using JsonConverter.Helpers;
using JsonConverter.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

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
				//return BadRequest("Bad things happens with a good developers");
			}
		}
		#endregion

		#region Get/Params
		//public IHttpActionResult Get(string name)
		//{
		//	IList<Contact> contacts = _monkey.Read();
		//	Contact contact = contacts.FirstOrDefault((item) => item.Name == name);

		//	if (contact == null)
		//	{
		//		return NotFound();
		//	}
		//	return Ok(contact);
		//}
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
				//return BadRequest("Bad things happens with a good developers");
			}
		}
		#endregion
    }
}
