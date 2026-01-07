---
title: TRAE builder tools
date: 2026-01-06
categories: [AI]
tags: [ai, ai-coding, rag, sh]
published: true
---

# Builder tools 中文概览

下面是将你提供的 **工具名 + 英文介绍** 翻译并整理成的中文表格（偏向技术/IDE 场景，保持语义准确而非直译）：

| 工具名                      | 中文说明                                                                      |
| ------------------------ | ------------------------------------------------------------------------- |
| **todo_write**           | 用于创建和维护当前编码会话的结构化待办事项列表，帮助跟踪进度、拆解复杂任务，并向用户展示任务执行的完整性和整体进展情况。              |
| **search_codebase**      | Trae 的上下文检索引擎。可通过自然语言描述在整个代码库中高精度检索相关代码，支持多语言、实时索引，仅反映当前磁盘上的代码状态，不包含版本历史。 |
| **search_by_regex**      | 基于文本的高速搜索工具，使用 ripgrep 在文件或目录中进行精确的正则模式匹配。                                |
| **view_files**           | 批量查看文件内容的工具，支持一次最多查看 3 个文件，用于快速获取上下文信息。                                   |
| **list_dir**             | 查看指定目录下的文件结构，可控制递归深度。                                                     |
| **write_to_file**        | 将内容写入文件，支持精确控制文件的新建或覆盖行为。                                                 |
| **update_file**          | 用于编辑文件内容的工具，适合在相较其他编辑方式更具成本效益时使用，支持基于字符串块的替换。                             |
| **edit_file_fast_apply** | 用于快速编辑行数少于 1000 行的文件，直接整体应用修改，适合小文件或明确改动场景。                               |
| **rename_file**          | 对已有文件进行重命名或移动。                                                            |
| **delete_file**          | 删除一个或多个已存在的文件，调用前需确保文件真实存在。                                               |
| **run_command**          | 代表用户提出并执行命令行命令，可配置执行方式（阻塞/非阻塞）、工作目录及是否需要用户审批。                             |
| **check_command_status** | 查询之前以非阻塞方式执行的命令状态，并获取其输出结果。                                               |
| **stop_command**         | 终止一个正在运行的命令（必须是之前已执行的命令）。                                                 |
| **open_preview**         | 当本地服务已成功启动时，将可访问的预览 URL 展示给用户以便在浏览器中打开。                                   |
| **web_search**           | 用于联网搜索信息的工具，需谨慎使用，频繁调用会影响用户体验并增加成本。                                       |
| **finish**               | 会话的最终工具，用于在确认已完成用户目标后标记任务结束并给出总结。                                         |

# 原始英文

```json
{
  "todo_write": {
    "description": "Use this tool to create and manage a structured task list for your current coding session. This helps you track progress, organize complex tasks, and demonstrate thoroughness to the user. It also helps the user understand the progress of the task and overall progress of their requests.",
    "params": {
      "type": "object",
      "properties": {
        "todos": {
          "description": "The updated todo list",
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "content": {"type": "string"},
              "status": {"type": "string", "enum": ["pending", "in_progress", "completed"]},
              "id": {"type": "string"},
              "priority": {"type": "string", "enum": ["high", "medium", "low"]}
            },
            "required": ["content", "status", "id", "priority"],
            "minItems": 3,
            "maxItems": 10
          }
        }
      },
      "required": ["todos"]
    }
  },
  "search_codebase": {
    "description": "This tool is Trae's context engine. It: 1. Takes in a natural language description of the code you are looking for; 2. Uses a proprietary retrieval/embedding model suite that produces the highest-quality recall of relevant code snippets from across the codebase; 3. Maintains a real-time index of the codebase, so the results are always up-to-date and reflects the current state of the codebase; 4. Can retrieve across different programming languages; 5. Only reflects the current state of the codebase on the disk, and has no information on version control or code history.",
    "params": {
      "type": "object",
      "properties": {
        "information_request": {"type": "string"},
        "target_directories": {"type": "array", "items": {"type": "string"}}
      },
      "required": ["information_request"]
    }
  },
  "search_by_regex": {
    "description": "Fast text-based search that finds exact pattern matches within files or directories, utilizing the ripgrep command for efficient searching.",
    "params": {
      "type": "object",
      "properties": {
        "query": {"type": "string"},
        "search_directory": {"type": "string"}
      },
      "required": ["query"]
    }
  },
  "view_files": {
    "description": "View up to 3 files simultaneously in batch mode for faster information gathering.",
    "params": {
      "type": "object",
      "properties": {
        "files": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "file_path": {"type": "string"},
              "start_line_one_indexed": {"type": "integer"},
              "end_line_one_indexed_inclusive": {"type": "integer"},
              "read_entire_file": {"type": "boolean"}
            },
            "required": ["file_path", "start_line_one_indexed", "end_line_one_indexed_inclusive"]
          }
        }
      },
      "required": ["files"]
    }
  },
  "list_dir": {
    "description": "You can use this tool to view files of the specified directory.",
    "params": {
      "type": "object",
      "properties": {
        "dir_path": {"type": "string"},
        "max_depth": {"type": "integer", "default": 3}
      },
      "required": ["dir_path"]
    }
  },
  "write_to_file": {
    "description": "You can use this tool to write content to a file with precise control over creation/rewrite behavior.",
    "params": {
      "type": "object",
      "properties": {
        "rewrite": {"type": "boolean"},
        "file_path": {"type": "string"},
        "content": {"type": "string"}
      },
      "required": ["rewrite", "file_path", "content"]
    }
  },
  "update_file": {
    "description": "You can use this tool to edit file, if you think that using this tool is more cost-effective than other available editing tools, you should choose this tool, otherwise you should choose other available edit tools.",
    "params": {
      "type": "object",
      "properties": {
        "file_path": {"type": "string"},
        "replace_blocks": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "old_str": {"type": "string"},
              "new_str": {"type": "string"}
            },
            "required": ["old_str", "new_str"]
          }
        }
      },
      "required": ["file_path", "replace_blocks"]
    }
  },
  "edit_file_fast_apply": {
    "description": "You can use this tool to edit an existing files with less than 1000 lines of code, and you should follow these rules:",
    "params": {
      "type": "object",
      "properties": {
        "file_path": {"type": "string"},
        "content": {"type": "string"},
        "instruction": {"type": "string", "default": ""},
        "code_language": {"type": "string"}
      },
      "required": ["file_path", "content"]
    }
  },
  "rename_file": {
    "description": "You can use this tool to move or rename an existing file.",
    "params": {
      "type": "object",
      "properties": {
        "file_path": {"type": "string"},
        "rename_file_path": {"type": "string"}
      },
      "required": ["file_path", "rename_file_path"]
    }
  },
  "delete_file": {
    "description": "You can use this tool to delete files, you can delete multi files in one toolcall, and you MUST make sure the files is exist before deleting.",
    "params": {
      "type": "object",
      "properties": {
        "file_paths": {"type": "array", "items": {"type": "string"}}
      },
      "required": ["file_paths"]
    }
  },
  "run_command": {
    "description": "You can use this tool to PROPOSE a command to run on behalf of the user.",
    "params": {
      "type": "object",
      "properties": {
        "command": {"type": "string"},
        "target_terminal": {"type": "string"},
        "command_type": {"type": "string"},
        "cwd": {"type": "string"},
        "blocking": {"type": "boolean"},
        "wait_ms_before_async": {"type": "integer", "minimum": 0},
        "requires_approval": {"type": "boolean"}
      },
      "required": ["command", "blocking", "requires_approval"]
    }
  },
  "check_command_status": {
    "description": "You can use this tool to get the status of a previously executed command by its Command ID ( non-blocking command ).",
    "params": {
      "type": "object",
      "properties": {
        "command_id": {"type": "string"},
        "wait_ms_before_check": {"type": "integer"},
        "output_character_count": {"type": "integer", "minimum": 0, "default": 1000},
        "skip_character_count": {"type": "integer", "minimum": 0, "default": 0},
        "output_priority": {"type": "string", "default": "bottom"}
      }
    }
  },
  "stop_command": {
    "description": "This tool allows you to terminate a currently running command( the command MUST be previously executed command. ).",
    "params": {
      "type": "object",
      "properties": {
        "command_id": {"type": "string"}
      },
      "required": ["command_id"]
    }
  },
  "open_preview": {
    "description": "You can use this tool to show the available preview URL to user if you have started a local server successfully in a previous toolcall, which user can open it in the browser.",
    "params": {
      "type": "object",
      "properties": {
        "preview_url": {"type": "string"},
        "command_id": {"type": "string"}
      },
      "required": ["preview_url", "command_id"]
    }
  },
  "web_search": {
    "description": "This tool can be used to search the internet, which should be used with caution, as frequent searches result in a bad user experience and excessive costs.",
    "params": {
      "type": "object",
      "properties": {
        "query": {"type": "string"},
        "num": {"type": "int32", "default": 5},
        "lr": {"type": "string"}
      },
      "required": ["query"]
    }
  },
  "finish": {
    "description": "The final tool of this session, when you think you have archived the goal of user requirement, you should use this tool to mark it as finish.",
    "params": {
      "type": "object",
      "properties": {
        "summary": {"type": "string"}
      },
      "required": ["summary"]
    }
  }
}
```



# 参考资料

https://github.com/x1xhlol/system-prompts-and-models-of-ai-tools

