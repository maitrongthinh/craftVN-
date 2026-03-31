# MineCollab - Benchmark Framework

**Task evaluation and autonomous agent testing framework for CraftVN**

[English](#english) | [Tiếng Việt](#tiếng-việt)

---

## English

### Overview

MineCollab is a comprehensive benchmark for evaluating multi-agent collaboration, communication, and task completion in Minecraft environments. The framework provides three distinct task categories with varying complexity levels.

### Quick Start

```bash
# Basic single-agent task
node main.js --task_path tasks/basic/single_agent.json --task_id gather_oak_logs

# Multi-agent cooking task
python tasks/evaluation_script.py \
  --no_launch_world \
  --template_profile profiles/tasks/cooking_profile.json \
  --task_path tasks/cooking_tasks/basic/1_agent.json \
  --num_agents 1
```

### Task Structure

All tasks follow this JSON format:

```json
{
  "task_name": {
    "goal": "Description of objective",
    "agent_count": 1,
    "target": "target_item",
    "number_of_target": 4,
    "initial_inventory": {
      "0": { "item_name": 1 }
    },
    "timeout": 300,
    "type": "basic",
    "blocked_actions": { "0": [] },
    "requires_ctable": false
  }
}
```

- **goal**: Objective description
- **initial_inventory**: Starting items for each agent
- **target/number_of_target**: Item collection goal
- **timeout**: Seconds before task abandonment
- **agent_count**: Number of agents participating

### Task Categories

#### 1. Gathering

Simple item collection tasks. Agents gather resources from the environment.

```bash
node main.js --task_path tasks/basic/single_agent.json --task_id gather_oak_logs
```

#### 2. Cooking

Multi-step food preparation with ingredient coordination.

**Features**:
- Agent collaboration on recipe assembly
- Natural language communication
- Multi-step crafting chains
- "Hell's Kitchen" variant: partial recipe knowledge requiring communication

**Example**:
```bash
python tasks/evaluation_script.py \
  --template_profile profiles/tasks/cooking_profile.json \
  --task_path tasks/cooking_tasks/basic/2_agent.json \
  --num_agents 2 \
  --usernames player1 player2
```

#### 3. Construction

Procedurally generated or downloaded blueprint building.

**Features**:
- Complex multi-room structures
- Material specialization per agent
- Tool and resource constraints
- Edit-distance based evaluation

**Example**:
```bash
python tasks/evaluation_script.py \
  --template_profile profiles/tasks/construction_profile.json \
  --task_path tasks/construction_tasks/basic/1_agent.json \
  --num_agents 1 \
  --insecure_coding  # Required for construction tasks
```

#### 4. Crafting

Tool and equipment crafting with dependencies.

**Features**:
- Single and multi-step recipes
- Inventory coordination
- Resource sharing
- Tool specialization

**Example**:
```bash
python tasks/evaluation_script.py \
  --template_profile profiles/tasks/crafting_profile.json \
  --task_path tasks/crafting_tasks/basic/1_agent.json \
  --num_agents 1
```

### Running Evaluation

```bash
python tasks/evaluation_script.py \
  --task_path <task_file> \
  --template_profile <profile> \
  --num_agents <count> \
  --usernames <username1> <username2> ... \
  --no_launch_world    # Skip auto-launch \
  --insecure_coding    # Allow code execution for construction tasks
```

### Performance Metrics

Tasks are evaluated based on:
- **Completion**: Did the agent finish the objective?
- **Time Efficiency**: How long did it take?
- **Resource Usage**: Were resources used optimally?
- **Communication**: Did agents coordinate effectively (multi-agent)?

---

## Tiếng Việt

### Tổng Quan

MineCollab là một benchmark toàn diện để đánh giá cộng tác đa agent, giao tiếp và hoàn thành nhiệm vụ trong môi trường Minecraft. Framework cung cấp ba thể loại nhiệm vụ khác nhau với các mức độ phức tạp khác nhau.

### Bắt Đầu Nhanh

```bash
# Tác vụ đơn agent cơ bản
node main.js --task_path tasks/basic/single_agent.json --task_id gather_oak_logs

# Tác vụ nấu ăn đa agent
python tasks/evaluation_script.py \
  --no_launch_world \
  --template_profile profiles/tasks/cooking_profile.json \
  --task_path tasks/cooking_tasks/basic/1_agent.json \
  --num_agents 1
```

### Cấu Trúc Tác Vụ

Tất cả các tác vụ tuân theo định dạng JSON này:

```json
{
  "task_name": {
    "goal": "Mô tả mục tiêu",
    "agent_count": 1,
    "target": "target_item",
    "number_of_target": 4,
    "initial_inventory": {
      "0": { "item_name": 1 }
    },
    "timeout": 300,
    "type": "basic",
    "blocked_actions": { "0": [] },
    "requires_ctable": false
  }
}
```

- **goal**: Mô tả mục tiêu
- **initial_inventory**: Các mục bắt đầu cho mỗi agent
- **target/number_of_target**: Mục tiêu thu thập mục
- **timeout**: Giây trước khi tác vụ bị bỏ
- **agent_count**: Số lượng agent tham gia

### Các Thể Loại Tác Vụ

#### 1. Thu Thập

Các tác vụ thu thập mục dễ dàng. Agents thu thập tài nguyên từ môi trường.

```bash
node main.js --task_path tasks/basic/single_agent.json --task_id gather_oak_logs
```

#### 2. Nấu Ăn

Chuẩn bị thực phẩm đa bước với phối hợp nguyên liệu.

**Tính Năng**:
- Cộng tác agent trên lắp ráp công thức
- Giao tiếp bằng ngôn ngữ tự nhiên
- Chuỗi crafting đa bước
- Biến thể "Hell's Kitchen": kiến thức công thức một phần yêu cầu giao tiếp

**Ví Dụ**:
```bash
python tasks/evaluation_script.py \
  --template_profile profiles/tasks/cooking_profile.json \
  --task_path tasks/cooking_tasks/basic/2_agent.json \
  --num_agents 2 \
  --usernames player1 player2
```

#### 3. Xây Dựng

Xây dựng blueprint được tạo bằng thủ tục hoặc tải xuống.

**Tính Năng**:
- Các cấu trúc phòng phức tạp
- Chuyên biệt hóa vật liệu cho mỗi agent
- Ràng buộc công cụ và tài nguyên
- Đánh giá dựa trên khoảng cách chỉnh sửa

**Ví Dụ**:
```bash
python tasks/evaluation_script.py \
  --template_profile profiles/tasks/construction_profile.json \
  --task_path tasks/construction_tasks/basic/1_agent.json \
  --num_agents 1 \
  --insecure_coding  # Cần thiết cho các tác vụ xây dựng
```

#### 4. Crafting

Crafting công cụ và thiết bị với các phụ thuộc.

**Tính Năng**:
- Công thức đơn bước và đa bước
- Phối hợp kho hàng
- Chia sẻ tài nguyên
- Chuyên biệt hóa công cụ

**Ví Dụ**:
```bash
python tasks/evaluation_script.py \
  --template_profile profiles/tasks/crafting_profile.json \
  --task_path tasks/crafting_tasks/basic/1_agent.json \
  --num_agents 1
```

### Chạy Đánh Giá

```bash
python tasks/evaluation_script.py \
  --task_path <task_file> \
  --template_profile <profile> \
  --num_agents <count> \
  --usernames <username1> <username2> ... \
  --no_launch_world    # Bỏ qua tự động khởi chạy
  --insecure_coding    # Cho phép thực thi code cho các tác vụ xây dựng
```

### Các Chỉ Số Hiệu Suất

Các tác vụ được đánh giá dựa trên:
- **Hoàn Thành**: Agent có hoàn thành mục tiêu không?
- **Hiệu Quả Thời Gian**: Mất bao lâu?
- **Sử Dụng Tài Nguyên**: Tài nguyên có được sử dụng tối ưu không?
- **Giao Tiếp**: Các agent có phối hợp hiệu quả không (đa agent)?
