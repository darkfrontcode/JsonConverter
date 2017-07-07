using JsonConverter.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JsonConverter.Helpers
{
    public class Monkey
    {
		public static string path = ConfigurationManager.AppSettings["path"];
		public string text;
		public string json;

		public List<Contact> Read()
		{
			if(!File.Exists(path)) File.Create(path).Dispose();

			text = System.IO.File.ReadAllText(path);
			return JsonConvert.DeserializeObject<List<Contact>>(text) ?? new List<Contact>();
		}

		public void Write(Contact contact)
		{
			List<Contact> contacts = Read();
			contacts.Add(contact);

			json = JsonConvert.SerializeObject(contacts, Formatting.Indented);
			System.IO.File.WriteAllText(path, json);
		}

		public void WriteAll(List<Contact> contacts)
		{
			json = JsonConvert.SerializeObject(contacts, Formatting.Indented);
			System.IO.File.WriteAllText(path, json);
		}
    }
}
