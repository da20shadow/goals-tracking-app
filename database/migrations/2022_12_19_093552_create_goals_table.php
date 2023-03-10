<?php

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
        Schema::create('goals', function (Blueprint $table) {
            $table->id();
            $table->string('title',145)->nullable(false);
            $table->longText('description')->nullable(true);
            $table->timestamp('start_date')->nullable(false)->useCurrent();
            $table->timestamp('due_date')->nullable(true);
            $table->foreignIdFor(User::class);
            $table->enum('category',[
                'Health',
                'Career',
                'Personal',
                'Spiritual',
                'Financial',
                'Educational',
                'Relationship',
                'Other'
            ])->default('Other');
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
        Schema::dropIfExists('goals');
    }
};
