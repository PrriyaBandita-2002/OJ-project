// Solution.jsx
const solutions = {
  maxSubArray: {
    cpp: `#include <iostream>
#include <vector>
#include <sstream>
#include <algorithm>
using namespace std;

int maxSubArray(vector<int>& nums) {
    int maxSum = nums[0];
    int currentSum = nums[0];
    for (int i = 1; i < nums.size(); ++i) {
        currentSum = max(nums[i], currentSum + nums[i]);
        maxSum = max(maxSum, currentSum);
    }
    return maxSum;
}

int main() {
    string line;
    getline(cin, line);
    line.erase(remove(line.begin(), line.end(), '['), line.end());
    line.erase(remove(line.begin(), line.end(), ']'), line.end());
    replace(line.begin(), line.end(), ',', ' ');

    vector<int> nums;
    stringstream ss(line);
    int num;
    while (ss >> num) {
        nums.push_back(num);
    }

    if (!nums.empty()) {
        cout << maxSubArray(nums) << endl;
    } else {
        cout << "0" << endl;
    }
    return 0;
}`,
    python: `def maxSubArray(nums):
    max_sum = current_sum = nums[0]
    for num in nums[1:]:
        current_sum = max(num, current_sum + num)
        max_sum = max(max_sum, current_sum)
    return max_sum

if __name__ == "__main__":
    import sys, json
    input_str = sys.stdin.read()
    nums = json.loads(input_str)
    if nums:
        print(maxSubArray(nums))
    else:
        print(0)`,
    java: `import java.util.*;

public class Main {
    public static int maxSubArray(int[] nums) {
        int maxSum = nums[0];
        int currentSum = nums[0];
        for (int i = 1; i < nums.length; i++) {
            currentSum = Math.max(nums[i], currentSum + nums[i]);
            maxSum = Math.max(maxSum, currentSum);
        }
        return maxSum;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String line = sc.useDelimiter("\\\\A").next();
        sc.close();

        line = line.replaceAll("[\\\\[\\\\]]", "").trim();
        String[] parts = line.split(",?");
        List<Integer> list = new ArrayList<>();
        for (String part : parts) {
            if (!part.trim().isEmpty()) {
                list.add(Integer.parseInt(part.trim()));
            }
        }

        if (!list.isEmpty()) {
            int[] nums = list.stream().mapToInt(i -> i).toArray();
            System.out.println(maxSubArray(nums));
        } else {
            System.out.println(0);
        }
    }
}`
  },
  moveZeroes: {
    cpp: `#include <iostream>
#include <vector>
#include <sstream>
#include <algorithm>
using namespace std;

void moveZeroes(vector<int>& nums) {
    int index = 0;
    for (int i = 0; i < nums.size(); i++) {
        if (nums[i] != 0) {
            nums[index++] = nums[i];
        }
    }
    while (index < nums.size()) {
        nums[index++] = 0;
    }
}

int main() {
    string line;
    getline(cin, line);
    line.erase(remove(line.begin(), line.end(), '['), line.end());
    line.erase(remove(line.begin(), line.end(), ']'), line.end());
    replace(line.begin(), line.end(), ',', ' ');

    vector<int> nums;
    stringstream ss(line);
    int num;
    while (ss >> num) {
        nums.push_back(num);
    }

    moveZeroes(nums);

    cout << "[";
    for (int i = 0; i < nums.size(); i++) {
        cout << nums[i];
        if (i != nums.size() - 1) cout << ",";
    }
    cout << "]" << endl;
    return 0;
}`,
    python: `import sys, json

def moveZeroes(nums):
    index = 0
    for i in range(len(nums)):
        if nums[i] != 0:
            nums[index] = nums[i]
            index += 1
    for i in range(index, len(nums)):
        nums[i] = 0

if __name__ == "__main__":
    input_str = sys.stdin.read()
    nums = json.loads(input_str)
    moveZeroes(nums)
    print(json.dumps(nums))`,
    java: `import java.util.*;

public class Main {
    public static void moveZeroes(int[] nums) {
        int index = 0;
        for (int i = 0; i < nums.length; i++) {
            if (nums[i] != 0) {
                nums[index++] = nums[i];
            }
        }
        while (index < nums.length) {
            nums[index++] = 0;
        }
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.useDelimiter("\\\\A").next().trim();
        input = input.replaceAll("[\\\\[\\\\]]", "");
        String[] parts = input.split(",?");

        int[] nums = new int[parts.length];
        for (int i = 0; i < parts.length; i++) {
            nums[i] = Integer.parseInt(parts[i].trim());
        }

        moveZeroes(nums);

        System.out.print("[");
        for (int i = 0; i < nums.length; i++) {
            System.out.print(nums[i]);
            if (i < nums.length - 1) System.out.print(",");
        }
        System.out.println("]");
    }
}`
  },

   mergeIntervals:{
   "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n#include <sstream>\n#include <algorithm>\nusing namespace std;\n\nvector<vector<int>> merge(vector<vector<int>>& intervals) {\n    if (intervals.empty()) return {};\n\n    sort(intervals.begin(), intervals.end());\n    vector<vector<int>> merged = { intervals[0] };\n\n    for (int i = 1; i < intervals.size(); ++i) {\n        vector<int>& last = merged.back();\n        if (intervals[i][0] <= last[1]) {\n            last[1] = max(last[1], intervals[i][1]);\n        } else {\n            merged.push_back(intervals[i]);\n        }\n    }\n\n    return merged;\n}\n\nint main() {\n    string input;\n    getline(cin, input);\n\n    input.erase(remove(input.begin(), input.end(), ' '), input.end());\n    if (!input.empty() && input.front() == '[') input.erase(0, 1);\n    if (!input.empty() && input.back() == ']') input.pop_back();\n\n    vector<vector<int>> intervals;\n    size_t i = 0;\n\n    while (i < input.size()) {\n        if (input[i] == '[') {\n            ++i;\n            string num1 = \"\", num2 = \"\";\n            while (i < input.size() && input[i] != ',') num1 += input[i++];\n            ++i;\n            while (i < input.size() && input[i] != ']') num2 += input[i++];\n            ++i;\n\n            try {\n                int a = stoi(num1);\n                int b = stoi(num2);\n                intervals.push_back({a, b});\n            } catch (...) {\n                cerr << \"Invalid number format in: [\" << num1 << \",\" << num2 << \"]\" << endl;\n                return 1;\n            }\n        } else {\n            ++i;\n        }\n    }\n\n    vector<vector<int>> result = merge(intervals);\n    cout << \"[\";\n    for (size_t i = 0; i < result.size(); ++i) {\n        cout << \"[\" << result[i][0] << \",\" << result[i][1] << \"]\";\n        if (i != result.size() - 1) cout << \",\";\n    }\n    cout << \"]\" << endl;\n    return 0;\n"
  },
  isPalindrome:{
    "cpp": "#include <iostream>\n#include <string>\n#include <algorithm>\n#include <cctype>\nusing namespace std;\n\n// Function to check if string is a valid palindrome\nbool isPalindrome(string s) {\n    string filtered;\n    \n    // Keep only alphanumeric characters and convert to lowercase\n    for (char c : s) {\n        if (isalnum(c)) {\n            filtered += tolower(c);\n        }\n    }\n\n    // Check if the filtered string is equal to its reverse\n    int left = 0, right = filtered.size() - 1;\n    while (left < right) {\n        if (filtered[left++] != filtered[right--]) {\n            return false;\n        }\n    }\n\n    return true;\n}\n\nint main() {\n    string input;\n    getline(cin, input); // Input: s = 'A man, a plan, a canal: Panama'\n\n    // Optional: extract only what's after \"s =\"\n    size_t pos = input.find(\"=\");\n    if (pos != string::npos) {\n        input = input.substr(pos + 1);\n        // Remove quotes and spaces\n        input.erase(remove(input.begin(), input.end(), '\\''), input.end());\n        input.erase(0, input.find_first_not_of(\" \"));\n    }\n\n    // Output result\n    cout << (isPalindrome(input) ? \"true\" : \"false\") << endl;\n\n    return 0;\n"
   },
  longestCommonPrefix:  {
   "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n#include <sstream>\n#include <algorithm>\nusing namespace std;\n\n// Function to find longest common prefix\nstring longestCommonPrefix(vector<string>& strs) {\n    if (strs.empty()) return \"\";\n\n    string prefix = strs[0];\n\n    for (int i = 1; i < strs.size(); ++i) {\n        int j = 0;\n        while (j < prefix.size() && j < strs[i].size() && prefix[j] == strs[i][j]) {\n            ++j;\n        }\n        prefix = prefix.substr(0, j);\n        if (prefix.empty()) break;\n    }\n\n    return prefix;\n}\n\nint main() {\n    string line;\n    getline(cin, line); // Example: strs = [\"flower\",\"flow\",\"flight\"]\n\n    // Extract what's after '='\n    size_t pos = line.find(\"=\");\n    if (pos != string::npos) {\n        line = line.substr(pos + 1);\n    }\n\n    // Remove square brackets and quotes\n    line.erase(remove(line.begin(), line.end(), '['), line.end());\n    line.erase(remove(line.begin(), line.end(), ']'), line.end());\n    line.erase(remove(line.begin(), line.end(), '\"'), line.end());\n\n    // Parse strings into vector\n    vector<string> strs;\n    stringstream ss(line);\n    string word;\n    while (getline(ss, word, ',')) {\n        // Remove leading spaces\n        word.erase(0, word.find_first_not_of(' '));\n        strs.push_back(word);\n    }\n\n    string result = longestCommonPrefix(strs);\n    cout << \"\\\"\" << result << \"\\\"\" << endl;\n\n    return 0;\n"
   },
  reverseWords: {
   "cpp": "#include <iostream>\n#include <sstream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nstring reverseWords(string s) {\n    stringstream ss(s);\n    string word;\n    vector<string> words;\n\n    // Extract words\n    while (ss >> word) {\n        words.push_back(word);\n    }\n\n    // Reverse the vector\n    reverse(words.begin(), words.end());\n\n    // Join the words with a single space\n    string result;\n    for (int i = 0; i < words.size(); ++i) {\n        result += words[i];\n        if (i != words.size() - 1) {\n            result += \" \";\n        }\n    }\n\n    return result;\n}\n\nint main() {\n    string input;\n    getline(cin, input);  // e.g., s = 'the sky is blue'\n\n    // Extract the actual string value after '='\n    size_t pos = input.find(\"=\");\n    if (pos != string::npos) {\n        input = input.substr(pos + 1);\n    }\n\n    // Trim leading/trailing quotes and spaces\n    input.erase(remove(input.begin(), input.end(), '\\''), input.end());\n    input.erase(0, input.find_first_not_of(\" \"));\n    input.erase(input.find_last_not_of(\" \") + 1);\n\n    string result = reverseWords(input);\n    cout << \"'\" << result << \"'\" << endl;\n\n    return 0;\n"
   },
 
  gcdOfStrings: {
     "cpp": "#include <iostream>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\n//  Function to compute GCD of two numbers\nint gcd(int a, int b) {\n    return b == 0 ? a : gcd(b, a % b);\n}\n\n// Function to compute GCD string\nstring gcdOfStrings(string str1, string str2) {\n    if (str1 + str2 != str2 + str1)\n        return \"\";\n    int len = gcd(str1.length(), str2.length());\n    return str1.substr(0, len);\n}\n\nint main() {\n    string input;\n    getline(cin, input); // Example: str1 = 'ABABAB', str2 = 'ABAB'\n\n    // Remove all spaces\n    input.erase(remove(input.begin(), input.end(), ' '), input.end());\n\n    // Parse str1\n    size_t start1 = input.find(\"str1='\") + 6;\n    size_t end1 = input.find(\"'\", start1);\n    string str1 = input.substr(start1, end1 - start1);\n\n    // Parse str2\n    size_t start2 = input.find(\"str2='\") + 6;\n    size_t end2 = input.find(\"'\", start2);\n    string str2 = input.substr(start2, end2 - start2);\n\n    string result = gcdOfStrings(str1, str2);\n    cout << \"'\" << result << \"'\" << endl;\n    return 0;\n"
  },


  groupAnagrams:  {
     "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n#include <unordered_map>\n#include <algorithm>\n#include <sstream>\nusing namespace std;\n\n// Function to group anagrams\nvector<vector<string>> groupAnagrams(vector<string>& strs) {\n    unordered_map<string, vector<string>> groups;\n\n    for (string s : strs) {\n        string sorted_s = s;\n        sort(sorted_s.begin(), sorted_s.end());\n        groups[sorted_s].push_back(s);\n    }\n\n    vector<vector<string>> result;\n    for (auto& entry : groups) {\n        result.push_back(entry.second);\n    }\n    return result;\n}\n\n// Helper to parse input: strs = [\"eat\",\"tea\",\"tan\",\"ate\",\"nat\",\"bat\"]\nvector<string> parseInput(const string& input) {\n    vector<string> result;\n    size_t start = input.find('[');\n    size_t end = input.find(']');\n    if (start == string::npos || end == string::npos || end <= start) return result;\n\n    string content = input.substr(start + 1, end - start - 1);\n    stringstream ss(content);\n    string token;\n\n    while (getline(ss, token, ',')) {\n        token.erase(remove(token.begin(), token.end(), '\"'), token.end()); // remove quotes\n        result.push_back(token);\n    }\n    return result;\n}\n\nint main() {\n    string input;\n    getline(cin, input); // Input: strs = [\"eat\",\"tea\",\"tan\",\"ate\",\"nat\",\"bat\"]\n\n    vector<string> strs = parseInput(input);\n    vector<vector<string>> result = groupAnagrams(strs);\n\n    // Output the result\n    cout << \"[\";\n    for (size_t i = 0; i < result.size(); ++i) {\n        cout << \"[\";\n        for (size_t j = 0; j < result[i].size(); ++j) {\n            cout << \"\\\"\" << result[i][j] << \"\\\"\";\n            if (j != result[i].size() - 1) cout << \",\";\n        }\n        cout << \"]\";\n        if (i != result.size() - 1) cout << \",\";\n    }\n    cout << \"]\" << endl;\n\n    return 0;\n"
   }
}


export default solutions;
