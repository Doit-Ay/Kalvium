export const sampleDocuments = {
  "hr-policy": {
    title: "Company HR Policy",
    icon: "HR",
    content: `Remote Work Policy

Our company supports a hybrid work model. Full-time employees are eligible for remote work up to 3 days per week after completing their 90-day probation period. Remote work requests must be approved by the direct manager.

Equipment and Setup: The company provides a laptop, monitor, and keyboard for home office setup. A one-time stipend of $500 is available for ergonomic furniture. IT support is available Monday through Friday from 9 AM to 6 PM.

Communication Requirements: Remote employees must be available on Slack during core hours (10 AM to 4 PM). Video cameras should be on during team meetings. Daily standup meetings are mandatory for all team members.

Leave Policy

Annual Leave: Full-time employees receive 20 days of paid annual leave per year. Leave accrues at 1.67 days per month. Unused leave up to 5 days can be carried forward to the next year.

Sick Leave: Employees receive 12 days of sick leave per year. A medical certificate is required for absences exceeding 3 consecutive days.

Parental Leave: Primary caregivers receive 16 weeks of paid parental leave. Secondary caregivers receive 4 weeks. Both parents are eligible regardless of gender.

Performance Reviews: Performance reviews are conducted quarterly. The review process includes self-assessment, peer feedback, and manager evaluation. Compensation adjustments are made annually based on performance ratings.

Expense Policy: Business travel expenses are reimbursed within 30 days of submission. Meals during travel are capped at $75 per day. Economy class flights are standard for domestic travel. Business class may be approved for flights exceeding 6 hours.`
  },
  "python-guide": {
    title: "Python Programming Guide",
    icon: "PY",
    content: `Introduction to Python Data Structures

Lists are ordered, mutable sequences in Python. They can contain elements of different types. Lists are created using square brackets. Common operations include append, insert, remove, and sort. List comprehensions provide a concise way to create lists.

Dictionaries store key-value pairs. Keys must be immutable and unique. Dictionaries are unordered in Python versions before 3.7, but maintain insertion order in 3.7 and later. The get method provides a safe way to access values with a default fallback.

Tuples are immutable sequences. They are often used for fixed collections of related values. Tuples support indexing and slicing but not modification. Named tuples from the collections module add field names for clarity.

Sets are unordered collections of unique elements. They support mathematical operations like union, intersection, and difference. Sets are useful for removing duplicates and membership testing. Frozen sets are immutable variants of sets.

Functions and Decorators

Functions in Python are first-class objects. They can be assigned to variables, passed as arguments, and returned from other functions. The def keyword defines a function. Lambda expressions create anonymous functions for simple operations.

Decorators modify or enhance functions without changing their source code. They use the @ syntax and are commonly used for logging, authentication, and caching. The functools.wraps decorator preserves the original function metadata.

Error Handling

Python uses try-except blocks for error handling. Multiple except clauses can catch different exception types. The finally block executes regardless of whether an exception occurred. Custom exceptions should inherit from the Exception class.

Context managers using the with statement ensure proper resource cleanup. The contextlib module provides utilities for creating context managers. Common use cases include file handling, database connections, and lock management.`
  },
  "climate-faq": {
    title: "Climate Science FAQ",
    icon: "SCI",
    content: `What is Climate Change?

Climate change refers to long-term shifts in global temperatures and weather patterns. While some changes are natural, since the 1800s, human activities have been the main driver. The primary cause is the burning of fossil fuels like coal, oil, and gas, which produces greenhouse gases.

The greenhouse effect occurs when certain gases in Earth's atmosphere trap heat from the sun. The main greenhouse gases are carbon dioxide, methane, nitrous oxide, and fluorinated gases. Carbon dioxide accounts for about 75% of global greenhouse gas emissions.

Global Temperature Trends

The Earth's average surface temperature has increased by approximately 1.1 degrees Celsius since the pre-industrial era. The last decade was the warmest on record. Arctic sea ice has declined by about 13% per decade since 1979.

Sea levels have risen by about 20 centimeters since 1900. The rate of sea level rise has accelerated in recent decades. Thermal expansion of water and melting ice sheets are the primary contributors.

Impact on Ecosystems

Climate change affects biodiversity through habitat loss and shifting ecosystems. Coral reefs are particularly vulnerable to ocean warming and acidification. Many species are migrating to higher altitudes and latitudes in response to changing temperatures.

Extreme weather events including heat waves, droughts, and intense storms are becoming more frequent. These events impact agriculture, water resources, and human health. Developing nations are disproportionately affected due to limited adaptive capacity.

Mitigation Strategies

Renewable energy sources including solar, wind, and hydropower are crucial for reducing emissions. Energy efficiency improvements in buildings, transportation, and industry can significantly reduce consumption. Carbon capture and storage technologies are being developed to remove CO2 from the atmosphere.

International agreements like the Paris Agreement aim to limit global warming to 1.5 degrees Celsius above pre-industrial levels. Individual actions such as reducing energy consumption, choosing sustainable transportation, and supporting renewable energy also contribute to climate solutions.`
  }
};

export const sampleQueries: Record<string, string[]> = {
  "hr-policy": [
    "What is the remote work policy?",
    "How many days of annual leave do employees get?",
    "What is the parental leave policy?",
    "How does the expense reimbursement work?",
    "When are performance reviews conducted?",
  ],
  "python-guide": [
    "What are Python decorators?",
    "How do dictionaries work in Python?",
    "What is error handling in Python?",
    "What are context managers?",
    "How do list comprehensions work?",
  ],
  "climate-faq": [
    "What causes climate change?",
    "How much has the temperature risen?",
    "What is the Paris Agreement?",
    "How does climate change affect oceans?",
    "What are renewable energy sources?",
  ],
};

// Pre-built simulated RAG responses
export const simulatedResponses: Record<string, Record<string, string>> = {
  "hr-policy": {
    "What is the remote work policy?":
      "Based on the company policy, **full-time employees can work remotely up to 3 days per week** after completing their 90-day probation period. Remote work requests need approval from the direct manager. The company provides equipment including a laptop, monitor, and keyboard, plus a **$500 one-time stipend** for ergonomic furniture. Remote employees must be available on Slack during core hours (10 AM–4 PM) and keep cameras on during team meetings.\n\n *Source: Remote Work Policy section*",
    "How many days of annual leave do employees get?":
      "Full-time employees receive **20 days of paid annual leave per year**, accruing at 1.67 days per month. Up to **5 unused days can carry forward** to the next year.\n\n *Source: Leave Policy → Annual Leave section*",
    "What is the parental leave policy?":
      "The company offers **16 weeks of paid leave for primary caregivers** and **4 weeks for secondary caregivers**. Both parents are eligible regardless of gender.\n\n *Source: Leave Policy → Parental Leave section*",
    "How does the expense reimbursement work?":
      "Business travel expenses are **reimbursed within 30 days** of submission. Meals during travel are **capped at $75/day**. Economy class is standard for domestic flights, with business class available for flights over 6 hours.\n\n *Source: Expense Policy section*",
    "When are performance reviews conducted?":
      "Performance reviews are conducted **quarterly** and include self-assessment, peer feedback, and manager evaluation. **Compensation adjustments are made annually** based on performance ratings.\n\n *Source: Performance Reviews section*",
  },
  "python-guide": {
    "What are Python decorators?":
      "Decorators **modify or enhance functions without changing their source code**. They use the `@` syntax and are commonly used for logging, authentication, and caching. The `functools.wraps` decorator preserves the original function's metadata.\n\n *Source: Functions and Decorators section*",
    "How do dictionaries work in Python?":
      "Dictionaries store **key-value pairs** where keys must be immutable and unique. Since Python 3.7, they **maintain insertion order**. The `get()` method provides safe access with a default fallback value.\n\n *Source: Introduction to Python Data Structures section*",
    "What is error handling in Python?":
      "Python uses **try-except blocks** for error handling. Multiple except clauses catch different exception types. The `finally` block runs regardless of exceptions. Custom exceptions should **inherit from the Exception class**.\n\n *Source: Error Handling section*",
    "What are context managers?":
      "Context managers use the **`with` statement** to ensure proper resource cleanup. The `contextlib` module helps create them. Common uses include **file handling, database connections, and lock management**.\n\n *Source: Error Handling section*",
    "How do list comprehensions work?":
      "List comprehensions provide a **concise way to create lists** in Python. They are part of lists, which are ordered, mutable sequences that can contain elements of different types.\n\n *Source: Introduction to Python Data Structures section*",
  },
  "climate-faq": {
    "What causes climate change?":
      "Climate change is primarily driven by **human activities since the 1800s**, mainly the burning of fossil fuels (coal, oil, gas) which produce greenhouse gases. The **greenhouse effect** traps heat in the atmosphere. CO₂ accounts for about **75% of global emissions**.\n\n *Source: What is Climate Change? section*",
    "How much has the temperature risen?":
      "Earth's average surface temperature has increased by **approximately 1.1C** since the pre-industrial era. The **last decade was the warmest on record**. Arctic sea ice has declined by about 13% per decade since 1979.\n\n *Source: Global Temperature Trends section*",
    "What is the Paris Agreement?":
      "The Paris Agreement is an international agreement that aims to **limit global warming to 1.5C** above pre-industrial levels. Along with international cooperation, **individual actions** like reducing energy consumption and supporting renewable energy also contribute.\n\n *Source: Mitigation Strategies section*",
    "How does climate change affect oceans?":
      "Sea levels have risen about **20cm since 1900**, with the rate accelerating recently. This is caused by **thermal expansion and melting ice sheets**. Coral reefs are particularly vulnerable to **ocean warming and acidification**.\n\n *Source: Global Temperature Trends & Impact on Ecosystems sections*",
    "What are renewable energy sources?":
      "Key renewable sources include **solar, wind, and hydropower**, which are crucial for reducing emissions. Combined with **energy efficiency improvements** in buildings, transport, and industry, plus emerging **carbon capture technologies**, these form the core mitigation strategy.\n\n *Source: Mitigation Strategies section*",
  },
};
