<?php

use App\Models\Target;
use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->string('title',145)->nullable(false);
            $table->longText('description')->nullable(true);
            $table->enum('status',['In Progress','To Do','In Revision','Completed'])->default('To Do');
            $table->enum('priority',['No priority','Low','High','Urgent'])->default('No priority');
            $table->foreignIdFor(Target::class)->nullable(true);
            $table->foreignIdFor(User::class)->nullable(false);
            $table->timestamp('start_date')->nullable(true);
            $table->timestamp('end_date')->nullable(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tasks');
    }
};
